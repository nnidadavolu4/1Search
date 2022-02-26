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
  const Data = await scrape(req.body.searchTerm);

  res.send("Data");
});

//confirm server success
app.listen(port, () => console.log(`app is listening on port ${port}!`));

//pulling required functions
const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("chromedriver");



//webscraping function
async function scrape(searchString) {

    customScrape(searchString,"https://au.shein.com/pdsearch/",
                              "/html/body/div[1]/div[1]/div[2]/div[2]/section/div[1]/section[",
                              "]/div[1]/a/img[2]","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[1]/a","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[1]/a","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[2]/section/div[1]/div/span","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[2]/section/div[1]/div/span");
  }
/*
  https://www.asos.com/au/search/?q=shirt&refine=floor:1000
  /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[1]/a/div[1]/img
  /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[5]/a/div[1]/img
  name: /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[1]/a/div[2]/div/div/h2
      /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[2]/a/div[2]/div/div/h2

      price
      /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[1]/a/p/span/span
      /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[2]/a/p/span/span
      link:
      /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[1]/a
      /html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[2]/a
*/
/*
async function SheinCustomUrl(type,size,color){
    switch case
}
*/



  async function customScrape(searchString,url,imgSrc1,imgSrc2,label1,label2,href1,href2,price1,price2){
    //wait for browser to open
  let driver = await new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().addArguments("--headless"))
  .build();

//go to shein
await driver.get(url + searchString);
let catalog = [];
for (let i = 0; i < 40; i++) {

  catalog[i] = {
    img: await driver
      .findElement(
        By.xpath(
          imgSrc1 + 
            (i + 1) +
            imgSrc2
        )
      )
      .getAttribute("src"),
    name: await driver
      .findElement(
        By.xpath(
          label1 +
            (i + 1) +
           label2
        )
      )
      .getAttribute("aria-label"),
    link: await driver
      .findElement(
        By.xpath(
          href1 +
            (i + 1) +
          href2
        )
      )
      .getAttribute("href"),
    price: await driver
      .findElement(
        By.xpath(
          price1 +
            (i + 1) +
            price2
        )
      )
      .getText(),
  };
}




//add new class atribute search term
// add more terms 
// implement wait to add more items.








  // convert JSON object to string
  const data = JSON.stringify(catalog);

  // write JSON string to a file
  fs.writeFile("data.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}
