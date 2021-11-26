const mongoose=require('mongoose')

const coinSchema= new mongoose.Schema({

    symbol: {
        type: String,
        unique: false
    },
    name: {
        type: String,
        unique: false
    },
   
    marketCapUsd:String,
    priceUsd: String,


}, {timestamps: true} )

module.exports = mongoose.model( 'Cryptocurrency', coinSchema ) 

