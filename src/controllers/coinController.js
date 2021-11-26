const axios = require('axios')
const coinModel= require("../Model/coinModel.js")

const getAssets= async function(req,res){
try{

    //-------------------fetch data--------------------------
    let options={
        method:"get",
        url:'http://api.coincap.io/v2/assets' 
    }

    let response=await axios(options)

    //------------------store in database------------------
    let dataArray = response.data.data
    for (i in dataArray) {
 
        let cryptoData = {
            symbol: dataArray[i].symbol,
            name: dataArray[i].name,
            marketCapUsd: dataArray[i].marketCapUsd,
            priceUsd: dataArray[i].priceUsd
        }
         await coinModel.create(cryptoData)
    }

    //------------------sorting by changePercent24Hr-------------------
    dataArray.sort(function (a, b) { return parseFloat(a.changePercent24Hr) - parseFloat(b.changePercent24Hr) })    
 
    res.status(200).send({ status: true, Data: dataArray })
 
}catch(error){
    res.status(500).send({msg:"failed",error:error.message})
}

};

module.exports.getAssets=getAssets;





