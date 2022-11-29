const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');


const getHTML=axios.get('https://rent-megapark.ru/')
.then(html=>{
    const $ = cheerio.load(html.data);
    
    //=========================================================
    const nameJeanHTML=$('.products-holder-info>.name').text().split('\n');
    const nameJeanArr=[];
    for (let i=0;i<=24;i++) {
        if (nameJeanHTML[i]!==''&&nameJeanHTML[i]!=='Swatches'){
            nameJeanArr.push(nameJeanHTML[i]) 
        }
    
      
    }
    //=============================================================
    const   priceJeanArr=[];
    const priceJeanHTML=$('.products-holder-info>.price').text().split('\n')//.match(/[\d]+[\.]+[\d]*/g);
    for (let i=0;i<=55;i++) {
        if (priceJeanHTML[i]!==''){
            priceJeanArr.push(priceJeanHTML[i]);
             
        }
        
    }
    //=======================================================
    const   imageJeanArr=[];
    const   imageJean=[];
    const imageJeanHTML=$('.products-holder-info>.img');
    imageJeanHTML.each((i,elem)=>{
        imageJean.push($(elem).find('img').attr('src'))
    })
    for(let i=0;i<=11;i++){
            if (imageJean[i]!=='assets/images/default.jpg'){
            imageJeanArr.push(imageJean[i]) 
        }
    }
    imageJeanArr.unshift('NO IMAGE')
    //==========================================================
    const totalArray=[]

    function Goodie(name, price,image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    for(i=0;i<=10;i++){
        const item = new Goodie(nameJeanArr[i], priceJeanArr[i],imageJeanArr[i]);
        totalArray.push(item)
        
        //console.log(arrayNameJean[i]);
        //console.log(arrayPriceJean[i])

    }
//==================================================

    //console.log(nameJeanArr)
    //console.log(priceJeanArr)
    //console.table(imageJeanArr)
    //console.log(totalArray)
    console.log($.html())
    
    
})

// airtable API key keyqBXUjRWwhafmU7
// appCxZ411GXCRNFkJ


//fetch('https://api.airtable.com/v0/appCxZ411GXCRNFkJ/tblvW2epdPIoA2V8R', {
        //method: 'POST',
        //headers: {
          //'Authorization': 'Bearer keyqBXUjRWwhafmU7',
          //'Content-Type': 'application/json'
        //},
        //body: JSON.stringify(totalArray)
      //})
      //.then(response => response.json())
    
//})