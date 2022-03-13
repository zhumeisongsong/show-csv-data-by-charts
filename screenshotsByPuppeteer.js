const puppeteer = require("puppeteer");

const pages = [
  {
    path: "",
    namea: ""
  }
]

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3001", { waitUntil: "networkidle2" });
    await page.screenshot({ path: "screenshots/example.png" });
    await browser.close();
  } catch (err) {
    console.error(err.message);
    return false;
  }
})();
