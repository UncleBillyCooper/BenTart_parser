const axios = require("axios");
const cheerio = require('cheerio');
const HttpProxyAgent = require("http-proxy-agent");
const HttpsProxyAgent = require("https-proxy-agent");


const url = "https://www.tartextextiles.com/Jean-Cloth_c_14.html";
const proxy = "http://79dbf7702f3666ec31048e7e8239ee9deb619102:@proxy.zenrows.com:8001";
const httpAgent = new HttpProxyAgent(proxy);
const httpsAgent = new HttpsProxyAgent(proxy);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
axios({
	url,
	httpAgent,
	httpsAgent,
	method: "GET",
})
    .then(response => {
        const $=cheerio.load(response.data);
        //===========================================
        function myFilter(value) {
            if (value!=='assets/images/default.jpg'&&value!==''&&value!=='Swatches'){
              return value
            }  
          }
        //===========================================
        const nameJeanHTML=$('.products-holder-info>.name').text().split('\n');
        const nameJeanArr=nameJeanHTML.filter(myFilter);
        
        //====================
        const priceJeanHTML=$('.products-holder-info>.price').text().split('\n');
        const   priceJeanArr=priceJeanHTML.filter(myFilter);
        
        //====================
        let   imageJeanArr=[];
        const   imageJean=[];
        const imageJeanHTML=$('.products-holder-info>.img')
        .each((i,elem)=>{
        imageJean.push($(elem).find('img').attr('src'));
       
        imageJeanArr=imageJean.filter(myFilter);
        imageJeanArr.unshift('NO IMAGE')

        //========================================
       
      const totalArray=[]
        let item

        function Goodie(name, price,image) {
            this.name = name;
            this.price = price;
            this.image = image;
        }

        for(i=0;i<=10;i++){
            item = new Goodie(nameJeanArr[i], priceJeanArr[i],imageJeanArr[i]);
            totalArray.push(item)
        }
        
        console.log(totalArray)
        //========================================
    })
        //====================
        //console.log(nameJeanArr)
        //console.log(priceJeanArr)
        //console.log(imageJeanArr)

    })
    .catch(error => console.log(error));
