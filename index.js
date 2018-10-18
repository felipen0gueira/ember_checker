const scrapeIt = require("scrape-it")
var request = require('request');
var cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var Q = require('q');

const createCsvWriter = require('csv-writer').createArrayCsvWriter;

//Set CSV header and path
const csvWriter = createCsvWriter({
    header: ['URL', 'Ember_version'],
    path: './ember_checkerVers.csv'
});


var urlSet = [];


//Scrape a page and return URL from table 

var getURLList = function(pageIndex) {
    var deferred = Q.defer();

    scrapeIt("https://domaintyper.com/top-websites/most-popular-websites-with-nz-domain/page/" + pageIndex, {
        data: {
            listItem: "tr",
            data: {
                listItem: "td",
                data: { listItem: 'td' }
            }
        }
    }).then(({ data, response }) => {
        deferred.resolve(data)
    });

    return deferred.promise;
}

let func = [];

//Build an array of URL from each page 
var scrapeURLList = function() {
    var deferred = Q.defer();


    for (var pIndex = 1; pIndex <= 10; pIndex++) {
        func.push(getURLList(pIndex));
    }

    Q.allSettled(func).then((results) => {
        var values = [];
        var urlSet = [];
        console.log("Results received!!");
        results.forEach(function(result) {
            if (result.state === "fulfilled") {
                values.push(result.value);

            } else {
                rejectedReq.push(result.reason);
            }
        });


        for (var i = 0; i < values.length; i++) {

            for (var j = 1; j < values[i].data.length; j++) {
                urlSet.push(values[i].data[j].data[1])
            }

        }

        deferred.resolve(urlSet)

    }, (error) => {
        console.log('Error allSettled ', error);
        deferred.reject(urlSet)
    })

    console.log('End Await');

    return deferred.promise;



}

scrapeURLList().then(urlLis => {


    (async () => {

        for (var i = 0; i < urlLis.length; i++) {

            console.log(urlLis[i]);

            await checkEmberVersion('http://' + urlLis[i]).then(input => {
                console.log('input');
                console.log(input);


                var records = [
                    [input.url, input.emberVer]
                ];
                csvWriter.writeRecords(records).then(() => {
                    console.log('row recorded');
                });


            }, function(error) {
                console.log('No Ember Found');
                

                var records = [
                    [urlLis[i], 'None']
                ];
                csvWriter.writeRecords(records).then(() => {
                    console.log('row recorded');
                });
            });

        }



    })()



});



function checkEmberVersion(addressURL) {

    var deferred = Q.defer();
    puppeteer.launch().then(async browser => {
        try {
            const page = await browser.newPage();
            await page.goto(addressURL, { waitUntil: 'load', timeout: 0 });


            try {
                var emberVers = await page.evaluate(() => Ember.VERSION);

                var checkedData = {
                    url: addressURL,
                    emberVer: emberVers
                };



                deferred.resolve(checkedData);
            } catch (e) {

                deferred.reject('an expection on page.evaluate ', e);
            }



            //console.log(checkedData);

        } catch (error) {
            console.log("Erro no site - " + error);
            deferred.reject(error);
        }

        await browser.close();
    });

    return deferred.promise;

}