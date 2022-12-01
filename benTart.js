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
        
        //========================================
        const priceJeanHTML=$('.products-holder-info>.price').text().split('\n')//.match(/[\d]+[\.]+[\d]*/g);
        const priceJeanArr=priceJeanHTML.filter(myFilter);
       
        //========================================
        let imageJeanArr=[];
        const varImageJean=[];
        const imageJeanHTML=$('.products-holder-info>.img');
        imageJeanHTML.each((i,elem)=>{
          varImageJean.push($(elem).find('img').attr('src'))
        })
        imageJeanArr=varImageJean.filter(myFilter)
        imageJeanArr.unshift('NO IMAGE')
        //========================================
        
        const totalArray=[];

        function Goody(name, price,image) {
          this.name = name;
          this.price = price;
          this.image = image;
        }
  
        for(i=0;i<11;i++){
          const item = new Goody(nameJeanArr[i], priceJeanArr[i],imageJeanArr[i]);
          totalArray.push(item)
          
        }

        //========================================
          
        //console.log(nameJeanArr.length)
        //console.log(priceJeanArr)
        //console.log(imageJeanArr)
        console.log(totalArray.length)
        //========================================
    
    })
    .catch(error => console.log(error));
