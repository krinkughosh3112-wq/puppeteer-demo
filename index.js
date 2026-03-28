const puppeteer = require('puppeteer');
const fs = require('fs');

const jobTitles = [
  'data analyst',
  'data scientist',
  'ml engineer',
  'generative ai',
  'artificial intelligence'
];

// Helper to build foundit URL slug
function buildSlug(title, company, location, id) {
  const clean = (str) => str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `https://www.foundit.in/job/${clean(title)}-${clean(company)}-${clean(location)}-${id}`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  let allJobs = [];
  let serial = 1;

  for (const title of jobTitles) {
    console.log(`\n🔍 Searching: ${title}...`);

    const url = `https://www.foundit.in/srp/results?query=${encodeURIComponent(title)}&location=India`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 4000));

    const jobs = await page.evaluate((jobTitle, startNum) => {
      const results = [];
      const cards = document.querySelectorAll('.cardContainer');

      cards.forEach(card => {
        const jobTitleEl = card.querySelector('.jobTitle');
        const companyEl = card.querySelector('.companyName');
        const locationEl = card.querySelector('.location');
        const jobId = card.getAttribute('id');

        if (jobTitleEl) {
          results.push({
            no: startNum++,
            search: jobTitle,
            title: jobTitleEl.innerText.trim(),
            company: companyEl ? companyEl.innerText.trim() : 'NA',
            location: locationEl ? locationEl.innerText.trim() : 'NA',
            jobId: jobId || ''
          });
        }
      });

      return results;
    }, title, serial);

    // Build proper links after scraping
    jobs.forEach(j => {
      j.link = buildSlug(j.title, j.company, j.location, j.jobId);
    });

    serial += jobs.length;
    allJobs = [...allJobs, ...jobs];
    console.log(`✅ Found ${jobs.length} jobs for "${title}"`);
  }

  let csv = 'No,Search Term,Job Title,Company,Location,Apply Link\n';
  allJobs.forEach(j => {
    csv += `${j.no},"${j.search}","${j.title}","${j.company}","${j.location}","${j.link}"\n`;
  });

  fs.writeFileSync('india_jobs.csv', csv);
  console.log(`\n🎉 Total ${allJobs.length} jobs saved to india_jobs.csv!`);

  await browser.close();
})();
