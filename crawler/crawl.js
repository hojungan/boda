const puppeteer = require("puppeteer");
const { AxePuppeteer } = require("@axe-core/puppeteer");

async function crawl(url, workType) {
  console.log("crawl.js", url, workType);
  // launch puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // navigate to page
  await page.goto(url);

  const axe = new AxePuppeteer(page).withTags(["wcag2a", "wcag2aa"]);

  const result = await axe.analyze();

  // close browser
  await browser.close();

  result.violations.forEach((violation) => {
    console.log(violation);
  });
}

module.exports = crawl;
