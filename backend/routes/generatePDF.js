const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
// const moment = require("moment");

const compile = async function(templateName, data) {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  return hbs.compile(html)(data);
};

// hbs.registerHelper("dateFormat", function(value, format) {
//   return moment(value).format(format);
// });

module.exports = {
  test: async function test(data) {
    console.log(data);
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const content = await compile("paper", data);

      await page.setContent(content);
      await page.emulateMedia("screen");
      return await page.pdf({
        path: "myPdf.pdf",
        format: "A4",
        printBackground: true
      });

      console.log("PDF GENERATED...");
      return pdf;
      // fs.unlinkSync("myPdf.pdf");
      await browser.close();
      process.exit();
    } catch (error) {
      console.log("error", error);
    }
  }
};
