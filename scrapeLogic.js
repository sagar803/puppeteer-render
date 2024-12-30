const puppeteer = require("puppeteer");

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://developer.chrome.com/");
    await page.setViewport({ width: 1080, height: 1024 });
    await page
      .locator(".devsite-search-field")
      .fill("automate beyond recorder");
    await page.locator(".devsite-result-item-link").click();

    const textSelector = await page
      .locator("text/Customize and automate")
      .waitHandle();
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    console.log('The title of this blog post is "%s".', fullTitle);
    res.send(fullTitle);
  } catch (error) {
    console.log("Error while scraping:", error);
    res.send(
      "Some error occurred while scraping the page. Please try again later."
    );
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
