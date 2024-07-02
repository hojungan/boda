const puppeteer = require("puppeteer");
const { AxePuppeteer } = require("@axe-core/puppeteer");

async function crawl(url, workType) {
  console.log("crawl.js", url, workType);
  // launch puppeteer
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // navigate to page
    await page.goto(url, { waitUntil: "networkidle0" });
    // Wait for the page to be fully loaded
    await page.waitForFrame();
    const axe = await new AxePuppeteer(page)
      .setLegacyMode()
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    console.log(axe);
  } catch (e) {
    console.log(e);
  }
  // close browser
  // await browser.close();
  // return result.violations;
  return "completed";
}

module.exports = crawl;
