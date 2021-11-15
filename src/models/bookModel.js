const mongoose=require('mongoose')

const bookSchema= new mongoose.Schema({

//String
//Number
// Boolean
// Array
// Object
// Date
// Buffer
// ObjectId

    bookName: {
        type: String,
        required: true
    },
    authorName: String,
    tags: [ String ], //array of strings 
    year: {
        type: Number,
        default: 2021
    },
    prices: {
        indianPrice: String,
        europeanPrice: String,
        
    },
    totalPages: Number,
    stockAvailable: Boolean,
    

}, {timestamps: true} )

module.exports = mongoose.model( 'Book', bookSchema ) 



// Intro to Backend Engineering
// FunctionUp
// #Programming #backend #nodejs #bestBookEver #cool #lifeChanging