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
async function scrape(searchString,type,size) {
    let sheinUrl = sheinCustomUrl(searchString,type,size);
    customScrape(sheinUrl,"https://au.shein.com/pdsearch/",
                              "/html/body/div[1]/div[1]/div[2]/div[2]/section/div[1]/section[",
                              "]/div[1]/a/img[2]","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[1]/a","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[1]/a","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[2]/section/div[1]/div/span","//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
                              "]/div[2]/div[2]/section/div[1]/div/span");

    customScrape(searchString, "https://au.shein.com/pdsearch/", )
                              
  }



/*
  h and m
  zara
  forever new
  myer
  cotton on 
*/

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

async function sheinCustomUrl(searchTerm,type,size){
  let url = "https://au.shein.com/pdsearch/" + searchTerm;
    switch(type){
      case "petite":
        if(size != null){
          if(size <= 6){
            url+= "?attr_values=Petite%20XXS&attr_ids=87_1002063&exc_attr_id=87"
          }
          if(size<= 8){
            url += "?attr_values=Petite%20XS&attr_ids=87_1002064&exc_attr_id=87"
          }elseif(size<= 10){
            url += "?attr_values=Petite%20S&exc_attr_id=87&attr_ids=87_1002065"
          }elseif(size<= 12){
            url += "?attr_values=Petite%20M&exc_attr_id=87&attr_ids=87_1002066"
          }
            url += "?attr_values=Petite%20L&exc_attr_id=87&attr_ids=87_1002067"
        }else{
            url += "?attr_values=Petite%20M-Petite%20S-Petite%20XS-Petite%20L-Petite%20XXS&exc_attr_id=87&attr_ids=87_1002066-87_1002065-87_1002064-87_1002067-87_1002063"
        }
        break:




/*
        https://au.shein.com/pdsearch/shirt/?attr_values=PetiteXS
        9 10 small
        https://au.shein.com/pdsearch/shirt/?attr_values=PetiteS
        11 12 medium
        https://au.shein.com/pdsearch/shirt/?attr_values=PetiteM
        14 16 large
        https://au.shein.com/pdsearch/shirt/?attr_values=PetiteL
        }
*/


        https://au.shein.com/plussize
        


      case "plus":

        if(size != null){
          if(size<= 16){
            url += "/?attr_values=0XL&exc_attr_id=87&attr_ids=87_1"
          }elseif(size<= 16){
            url += "attr_values=1XL&exc_attr_id=87&attr_ids=87_4"
          }elseif(size<= 18){
            url += "/?attr_values=2XL&exc_attr_id=87&attr_ids=87_13"
        }elseif(size<= 20){
            url += "/?attr_values=3XL&attr_ids=87_24&exc_attr_id=87"
        }

      }else{
            url += "?attr_values=0XL-1XL-2XL-3XL-4XL-5XL&attr_ids=87_1-87_4-87_13-87_24-87_32-87_35&exc_attr_id=87"
        }
        break:
        /*
        https://au.shein.com/pdsearch/shirt/?attr_values=1XL-2XL-3XL-4XL-5XL

      https://au.shein.com/pdsearch/shirt/?attr_values=XL
      https://au.shein.com/pdsearch/shirt/?attr_values=1XL


        https://au.shein.com/pdsearch/shirt/?attr_values=XXXL

        break:

        <16 
        XL

        16-18
        XXL

        18-20
        XXXL

        20-22
        XXXXL

        22+
        5L

*/
      case "maternity":
        url = "https://au.shein.com/pdsearch/maternity%20" + "maternity " + searchTerm;

        if(size != null){
          if(size<= 8){
              url += "/?attr_values=XXS&exc_attr_id=87&attr_ids=87_757"
            }elseif(size<= 10){
              url += "/?attr_values=S&exc_attr_id=87&attr_ids=87_568"
          }elseif(size<= 12){
            url += "/?attr_values=L&attr_ids=87_387&exc_attr_id=87"
          }elseif(size<= 14){
            url += "/?attr_values=0XL&exc_attr_id=87&attr_ids=87_1"
          }elseif(size<= 16){
            url += "attr_values=1XL&exc_attr_id=87&attr_ids=87_4"
          }elseif(size<= 18){
            url += "/?attr_values=2XL&exc_attr_id=87&attr_ids=87_13"
        }elseif(size<= 20){
            url += "/?attr_values=3XL&attr_ids=87_24&exc_attr_id=87"
        }


    }



}




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

/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a
/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a
/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a


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
