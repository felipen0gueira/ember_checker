const scrapeIt = require("scrape-it")
var request = require('request');
var cheerio = require('cheerio');

const puppeteer = require('puppeteer');
/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.playstation.com/en-us/explore/playstationnow/');
  await page.screenshot({path: 'example.png'});

  const handle = await page.evaluateHandle(() => ({window, document}));
  const properties = await handle.getProperties();
  const windowHandle = properties.get('window');

  const documentHandle = properties.get('document');

  console.log(properties);
  //console.log(windowHandle);

  await browser.close();
})();*/

function verificarVersao(endereco){
  puppeteer.launch().then(async browser => {
    try{
      const page = await browser.newPage();
      await page.goto(endereco);
      console.log(endereco+" - "+ await page.evaluate(() => Ember.VERSION));
    }catch(error){
      console.log("Erro no site - "+endereco);
    }
  //await page.goto('https://www.playstation.com/en-us/explore/playstationnow/');
  //console.log(await page.evaluate(() => Ember.VERSION));
  await browser.close();
});

}

var urlSet = [];





/*scrapeIt("https://www.bharatdarshan.co.nz/", {
  scriptJS:{listItem: "script"}
}).then(({ data, response }) => {

    //console.log(data);
  
})*/

/*
url = 'https://www.playstation.com/en-us/explore/playstationnow/';

request(url, function(error, response, html){
  //console.log(html);

  var $ = cheerio.load(html);
  console.log($('Ember'));
});*/


/*
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


url = 'https://www.playstation.com/en-us/explore/playstationnow/';

request(url, function(error, response, html){
  console.log(html);

  const dom = new JSDOM(html, { runScripts: "dangerously",  resources: "usable" });


    setTimeout(() => {
      console.log("dom.window");
      console.log(html);
      
      const emberVersion = dom.window.Ember && dom.window.Ember.VERSION ? dom.window.Ember.VERSION : 'Not Using Ember';

      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);

  }, 40000);*/

  //var $ = cheerio.load(html);
  //console.log($);
//});


//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;

//const fetch = require('node-fetch');

//fetch('https://www.playstation.com/en-us/explore/playstationnow/')
//.then(res => res.text())
//.then(body => {
//    const dom = new JSDOM(body, { runScripts: "dangerously",  resources: "usable" });


  //  setTimeout(() => {
  //    console.log("dom.window");
//      console.log(body);
      
      //const emberVersion = dom.window.Ember && dom.window.Ember.VERSION ? dom.window.Ember.VERSION : 'Not Using Ember';

    /*console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
      console.log(`Ember Version = ${emberVersion}`);
*/
//  }, 10000);

//});



  var p1 = new Promise(
    (resolve, reject) => {

      var k=0;
      for(var j=1;j<=12;j++)
      {
        
        scrapeIt("https://domaintyper.com/top-websites/most-popular-websites-with-nz-domain/page/"+j, {
          data: {
            listItem: "tr", 
            data:{
                listItem:"td", data:{listItem:'td'}
            }
          }
        }).then(({ data, response }) => {


      //console.log(`Status Code: ${response.statusCode}`)
    
      for(var i=0;i<data.data.length;i++)
      {

          //console.log(urlSet);
          urlSet.push("https://"+data.data[i].data[1]);
          //console.log("https://"+data.data[i].data[1]);
          //verificarVersao("https://"+data.data[i].data[1]);
    
      }

      resolve(urlSet) 
    }
    
  )
        
}

    });

  p1.then(
    function(val) {
      console.log(val.length);
      (async function loop() {
    for (let i = 0; i < 100; i++) {
        //await new Promise(resolve => setTimeout(resolve, Math.random() * 10000));
        await verificarVersao(val[i]);
        console.log(val[i]);
    }
})();

    });
