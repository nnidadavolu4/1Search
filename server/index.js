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
async function scrape(searchString, type, size) {
  let sheinUrl = sheinCustomUrl(searchString, type, size);
  let asosUrl = ASOSCustomUrl(searchString, type, size);
  console.log(asosUrl);
  /*
  customScrape(
    sheinUrl,
    "/html/body/div[1]/div[1]/div[2]/div[2]/section/div[1]/section[",
    "]/div[1]/a/img[2]",
    "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
    "]/div[2]/div[1]/a",
    "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
    "]/div[2]/div[2]/section/div[1]/div/span",
    "//*[@id='product-list-v2']/div[2]/div[2]/section/div[1]/section[",
    "]/div[2]/div[2]/section/div[1]/div/span"
  )
*/
/*
  if(size == null){
  if(type == "maternity"){
customScrape(type,size,"https://www2.hm.com/en_au/search-results.html?q="+searchString+"+ladies+maternity",
"/html/body/main/div[3]/div/div[1]/ul/li[",
"]/article/div[1]/a/img","/html/body/main/div[3]/div/div[1]/ul/li[",
"]/article/div[2]/h3/a","/html/body/main/div[3]/div/div[1]/ul/li[",
"]/article/div[2]/strong/span")
  } else if (type == "plus") {
    customScrape(type,size,"https://www2.hm.com/en_au/search-results.html?q="+searchString+"+ladies&department=1&sort=stock&sizes=381_3xl_1_womenswear&image-size=small&image=model&offset=0&page-size=40",
    "/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[1]/a/img","/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[2]/h3/a","/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[2]/strong/span")
  }else if (type != "petite"){
    customScrape(type,size,"https://www2.hm.com/en_au/search-results.html?q="+searchString+"+ladies",
    "/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[1]/a/img","/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[2]/h3/a","/html/body/main/div[3]/div/div[1]/ul/li[",
    "]/article/div[2]/strong/span")
  }
} 
*/
    /*
/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[1]/div/div[1]/div[2]/div/a/ul/li[1]/div/img

  url,
  imgSrc1,
  imgSrc2,

  href1,
  href2,
  price1,
  price2



*///html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[1]/div/div[1]/div[2]/div/a/ul/li[1]/div/img
/*
  if(type == "plus"){
customScrape(type,size,"https://www.forevernew.com.au/catalogsearch/result/?q="+searchString+"+curve",
  "/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
  "]/div/div[1]/div[2]/div/a/ul/li[1]/div/img","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
  "]/div/div[2]/div[2]/a","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
  "]/div/div[2]/div[3]/div/span");

  }else if(type == "petite"){
    customScrape(type,size,"https://www.forevernew.com.au/catalogsearch/result/?q="+searchString+"+petite",
    "/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
    "]/div/div[1]/div[2]/div/a/ul/li[1]/div/img","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
    "]/div/div[2]/div[2]/a","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
    "]/div/div[2]/div[3]/div/span");
  
      }else if(type != "maternity"){
        customScrape(type,size,"https://www.forevernew.com.au/catalogsearch/result/?q="+searchString,
        "/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
        "]/div/div[1]/div[2]/div/a/ul/li[1]/div/img","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
        "]/div/div[2]/div[2]/a","/html/body/div[3]/main/div[2]/div/div[2]/div[4]/ul/li[",
        "]/div/div[2]/div[3]/div/span");
      
          }

*/
/*
customScrape("Myer",
  "/html/body/div[1]/div[1]/div[2]/div[6]/div[3]/div[2]/ul/li[",
  "]/div/h3/a/div[1]/img","/html/body/div[1]/div[1]/div[2]/div[6]/div[3]/div[2]/ul/li[",
  "]/div/h3/a","/html/body/div[1]/div[1]/div[2]/div[6]/div[3]/div[2]/ul/li[",
  "]/div/div[1]/div/div[2]/div/span");
*/
/*
if(type=="plus"){
customScrape(type,size,"https://cottonon.com/AU/co/?q="+searchString+"&prefn1=gender&prefv1=Women&prefn2=size&prefv2=20%20%2F%203XL",
  "/html/body/div[3]/div[10]/div[5]/div[4]/ul/li[",
  "]/div/div[1]/a/img","/html/body/div[3]/div[10]/div[5]/div[4]/ul/li[",
  "]/div/div[4]/a","/html/body/div[3]/div[10]/div[5]/div[5]/ul/li[",
  "]/div/div[4]/a","/html/body/div[3]/div[10]/div[5]/div[5]/ul/li[",
  "]/div/div[5]/span[2]");
  }else if (type == null){
    customScrape(type,size,"https://cottonon.com/AU/co/?q="+searchString+"&prefn1=gender&prefv1=Women&start=0&sz=24",
  "/html/body/div[3]/div[10]/div[5]/div[4]/ul/li[",
  "]/div/div[1]/a/img","/html/body/div[3]/div[10]/div[5]/div[4]/ul/li[",
  "]/div/div[4]/a","/html/body/div[3]/div[10]/div[5]/div[4]/ul/li[",
  "]/div/div[5]/span");
  }
*/
  //html/body/div[3]/div[10]/div[5]/div[4]/ul/li[1]/div/div[1]/a/img


  




  //html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[1]/a/div[1]/img
  
  customScrape(
    type,
    size,
    asosUrl,

    "/html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[",
    "]/a/div[1]/img",
    "/html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[",
    "]/a",
    "/html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[",
    "]/a/p/span/span"
  );
  }
/*
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
  */
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

async function sheinCustomUrl(searchTerm, type, size) {
  let url = "https://au.shein.com/pdsearch/" + searchTerm;
  switch (type) {
    case "petite":
      if (size != null) {
        if (size <= 6) {
          url += "?attr_values=Petite%20XXS&attr_ids=87_1002063&exc_attr_id=87";
        } else if (size <= 8) {
          url += "?attr_values=Petite%20XS&attr_ids=87_1002064&exc_attr_id=87";
        } else if (size <= 10) {
          url += "?attr_values=Petite%20S&exc_attr_id=87&attr_ids=87_1002065";
        } else if (size <= 12) {
          url += "?attr_values=Petite%20M&exc_attr_id=87&attr_ids=87_1002066";
        }
        url += "?attr_values=Petite%20L&exc_attr_id=87&attr_ids=87_1002067";
      } else {
        url +=
          "?attr_values=Petite%20M-Petite%20S-Petite%20XS-Petite%20L-Petite%20XXS&exc_attr_id=87&attr_ids=87_1002066-87_1002065-87_1002064-87_1002067-87_1002063";
      }
      break;

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
    //https://au.shein.com/plussize

    case "plus":
      if (size != null) {
        if (size <= 14) {
          url += "/?attr_values=0XL&exc_attr_id=87&attr_ids=87_1";
        } else if (size <= 16) {
          url += "/?attr_values=1XL&exc_attr_id=87&attr_ids=87_4";
        } else if (size <= 18) {
          url += "/?attr_values=2XL&exc_attr_id=87&attr_ids=87_13";
        } else if (size <= 20) {
          url += "/?attr_values=3XL&attr_ids=87_24&exc_attr_id=87";
        }
      } else {
        // size == null
        url +=
          "?attr_values=0XL-1XL-2XL-3XL-4XL-5XL&attr_ids=87_1-87_4-87_13-87_24-87_32-87_35&exc_attr_id=87";
      }
      break;
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
      url = "https://au.shein.com/pdsearch/maternity%20" + searchTerm;

      if (size != null) {
        if (size <= 8) {
          url += "/?attr_values=XXS&exc_attr_id=87&attr_ids=87_757";
        } else if (size <= 10) {
          url += "/?attr_values=S&exc_attr_id=87&attr_ids=87_568";
        } else if (size <= 12) {
          url += "/?attr_values=L&attr_ids=87_387&exc_attr_id=87";
        } else if (size <= 14) {
          url += "/?attr_values=0XL&exc_attr_id=87&attr_ids=87_1";
        } else if (size <= 16) {
          url += "attr_values=1XL&exc_attr_id=87&attr_ids=87_4";
        } else if (size <= 18) {
          url += "/?attr_values=2XL&exc_attr_id=87&attr_ids=87_13";
        } else if (size <= 20) {
          url += "/?attr_values=3XL&attr_ids=87_24&exc_attr_id=87";
        }
      }
      break;
    default:
      if (size != null) {
        if (size <= 8) {
          url += "/?attr_values=XXS&exc_attr_id=87&attr_ids=87_757";
        } else if (size <= 10) {
          url += "/?attr_values=S&exc_attr_id=87&attr_ids=87_568";
        } else if (size <= 12) {
          url += "/?attr_values=L&attr_ids=87_387&exc_attr_id=87";
        } else if (size <= 14) {
          url += "/?attr_values=0XL&exc_attr_id=87&attr_ids=87_1";
        } else if (size <= 16) {
          url += "attr_values=1XL&exc_attr_id=87&attr_ids=87_4";
        } else if (size <= 18) {
          url += "/?attr_values=2XL&exc_attr_id=87&attr_ids=87_13";
        }
      }
      return url;
  }
}

async function ASOSCustomUrl(searchTerm, type, size) {
  //Took out currentpricerange=5-410 since we get different
  //For plus size: /?currentpricerange=5-690&q=shirt
  let url = "https://www.asos.com/au/search/?currentpricerange=5-690&q=" + searchTerm;
  switch (type) {
    case "petite":
      url += "&refine=attribute_10155:6403|floor:1000";
      if (size != null) {
        //size == 6 && size == 5 maybe??
        if (size <= 6) {
          url += "|size:91";
        } else if (size <= 8) {
          url += "|size:103";
        } else if (size <= 10) {
          url += "|size:19";
        } else if (size <= 12) {
          url += "|size:31";
        } else {
          //Size > 12
          url += "|size:149,43,55,67"; //What about 22...32?
        }
      } else {
        //size == null, select all petite, do nothing
      }
      break;

    case "plus":
      url += "&refine=attribute_10155:7699|floor:1000";
      if (size != null) {
        if (size <= 16) {
          url += "|size:55";
        } else if (size <= 18) {
          url += "|size:67";
        } else if (size <= 20) {
          url += "|size:149";
        }
        //if size != null but >20?
      } else {
        //size == null
        //do nothing
      }
      break;

    case "maternity":
      url += "&refine=attribute_10155:6400|floor:1000";
      if (size != null) {
        if (size <= 8) {
          url += "|size:103";
        } else if (size <= 10) {
          url += "|size:19";
        } else if (size <= 12) {
          url += "|size:31";
        } else if (size <= 14) {
          url += "|size:43";
        } else if (size <= 16) {
          url += "|size:55";
        } else if (size <= 18) {
          url += "|size:67";
        } else if (size <= 20) {
          url += "|size:149";
        } else if (size > 20) {
          //size 24
          url += "|size:179,203";
        }
      }
      break;

    default:
      //size url are all the same, except take away the |
      url += "&refine=floor:1000";
      if (size != null) {
        if (size <= 8) {
          url += "|size:103";
        } else if (size <= 10) {
          url += "|size:19";
        } else if (size <= 12) {
          url += "|size:31";
        } else if (size <= 14) {
          url += "|size:43";
        } else if (size <= 16) {
          url += "|size:55";
        } else if (size <= 18) {
          url += "|size:67";
        } else if (size <= 20) {
          url += "|size:149";
        }
      }
      }  
      return url;
  }



async function customScrape(
  type,
  size,
  url,
  imgSrc1,
  imgSrc2,
  href1,
  href2,
  price1,
  price2
) {
  //wait for browser to open
  let driver = await new Builder()
    .forBrowser("chrome")
    //.setChromeOptions(new chrome.Options().addArguments("--headless"))
    .build();

  //go to website
  await driver.get(url);
  let catalog = [];
 
  for (let i = 0; i < 4; i++) {
    
    catalog[i] = {
      
      img: await driver
        .findElement(By.xpath(imgSrc1 + (i + 1) + imgSrc2))
        .getAttribute("src"),
      name: await driver
        .findElement(By.xpath(imgSrc1 + (i + 1) + imgSrc2))
        .getAttribute("alt"),
      link: await driver
        .findElement(By.xpath(href1 + (i + 1) + href2))
        .getAttribute("href"),
      price: await driver
        .findElement(By.xpath(price1 + (i + 1) + price2))
        .getText(),
      type:type,
      size:size
    };

    if(catalog[i].name == ""){
      catalog[i].name = await driver.findElement(By.xpath("/html/body/div[1]/div/main/div/div/div[3]/div/div[1]/section/article[9]/a/div[2]/div/div/h2")).getText()
    }
  }


  
  let originalData = fs.readFileSync("data.json", "utf-8");

  let newData = JSON.parse(originalData);

  newData.push(catalog);

  originalData = JSON.stringify(newData);

  fs.writeFileSync("data.json", originalData, "utf-8");
  console.log(catalog);
  
  /*
/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a
/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a
/html/body/main/div[2]/div/div/div[3]/ul/li[+ i +]/article/div[2]/h3/a
*/

  //add new class atribute search term
  // add more terms
  // implement wait to add more items.

}
