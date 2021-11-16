const mongoose=require('mongoose')

const newBookSchema= new mongoose.Schema({   //class



    bookName: {
        type: String,
        required: true
    },
    author_id: {                            ///student
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required:true
    },
    
    prices: Number,

    ratings: Number,
        
    
    

}, {timestamps: true} )

module.exports = mongoose.model( 'NewBook', newBookSchema ) 

