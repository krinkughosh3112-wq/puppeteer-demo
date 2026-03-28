#  Job Scraper using Puppeteer

An automated job scraping tool built with Node.js and Puppeteer that collects real Indian job listings and exports them to Excel.

##  What it does
- Automatically searches for Data Science, ML, AI & related jobs
- Scrapes job title, company name, location & direct apply link
- Saves everything neatly to a CSV file (opens in Excel)
- Covers 5 job roles across India in one run!

##  Tools Used
- **Node.js** — JavaScript runtime
- **Puppeteer** — Browser automation library
- **fs module** — File saving (built into Node.js)

## Sample Output

| No | Search Term | Job Title | Company | Location | Apply Link |
|----|-------------|-----------|---------|----------|------------|
| 1 | data analyst | Data Analyst | S&P Global | India | foundit.in/... |
| 2 | data scientist | Data Scientist | Gartner | Gurugram | foundit.in/... |

## How to Run

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/puppeteer-demo.git
cd puppeteer-demo
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the scraper**
```bash
node index.js
```

**4. Open `india_jobs.csv` in Excel** ✅

##  Output
- `india_jobs.csv` — 75+ job listings with direct apply links

##  Job Roles Scraped
- Data Analyst
- Data Scientist
- ML Engineer
- Generative AI
- Artificial Intelligence

##  Key Learnings
- Browser automation using Puppeteer
- CSS Selectors & DOM scraping
- Saving scraped data as CSV
- Debugging dynamic websites

##  Future Plans
- Scrape multiple pages (200+ jobs)
- Add Pandas analysis for job market trends
- Visualize which cities & companies hire most
- Schedule scraper to run daily automatically

## 👤 Author
**Rinku Ghosh** — Data Science Student