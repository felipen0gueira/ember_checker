const scrapeIt = require("scrape-it")


var k=0;
for(var j=1;j<=12;j++)
{
// Promise interface
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
    {console.log("site  - "+data.data[i].data[1]);
  }
})
}
