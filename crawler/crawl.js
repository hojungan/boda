const puppeteer = require("puppeteer");
const { AxePuppeteer } = require("@axe-core/puppeteer");

async function crawl(url, workType) {
  console.log("crawl.js", url, workType);
  // launch puppeteer
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let axeResult = "axeResult: undefined";
  await page.goto(url);

  try {
    // navigate to page
    // Wait for the page to be fully loaded
    axeResult = await new AxePuppeteer(page)
      // .setLegacyMode(true)
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    console.log(axeResult);
  } catch (e) {
    console.log(e);
  }
  // close browser
  await browser.close();
  // return result.violations;
  return axeResult;
}

module.exports = crawl;
