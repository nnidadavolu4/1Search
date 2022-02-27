const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

//security
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//scrape when submit button is triggered
app.post("/items", async (req, res) => {
  console.log(req.body);
  const Data = await scrape(req.body.searchTerm, req.body.type, req.body.size);

  res.send("Data");
});

//confirm server success
app.listen(port, () => console.log(`app is listening on port ${port}!`));

//pulling required functions
const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");


//webscraping function
async function scrape(searchString,type,size) {
  //wait for browser to open
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--headless"))
    .build();

  //go to shein
  await driver.get(`https://au.shein.com/pdsearch/${searchString +" "+  type}/`);
  let catalog = [];
  for (let i = 0; i < 6; i++) {

    catalog[i] = {
      img: await driver
        .findElement(
          By.xpath(
            "/html/body/div[1]/div[1]/div[2]/div[2]/section/div[1]/section[" +
              (i + 1) +
              "]/div[1]/a/img[2]"
          )
        )
        .getAttribute("src"),
      name: await driver
        .findElement(
          By.xpath(
            "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[" +
              (i + 1) +
              "]/div[2]/div[1]/a"
          )
        )
        .getAttribute("aria-label"),
      link: await driver
        .findElement(
          By.xpath(
            "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[" +
              (i + 1) +
              "]/div[2]/div[1]/a"
          )
        )
        .getAttribute("href"),
      price: await driver
        .findElement(
          By.xpath(
            "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[" +
              (i + 1) +
              "]/div[2]/div[2]/section/div[1]/div/span"
          )
        )
        .getText(),
    };
  }

  // convert JSON object to string
  const data = JSON.stringify(catalog);

  // write JSON string to a file
  fs.writeFile("user.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}
