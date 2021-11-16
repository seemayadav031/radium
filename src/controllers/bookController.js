const BookModel= require("../models/bookModel.js")
const newBookModel= require("../models/newBookModel.js")
const authorModel= require("../models/authorModel.js")
const mongoose= require("mongoose")

const createBook = async function (req, res) {
    const book= req.body
    let savedBook= await BookModel.create(book)
    res.send({msg: savedBook})
}

const bookList = async function (req, res) {
    let allBook= await BookModel.find().select( { bookName: 1, authorName: 1 } )
    res.send({msg: allBook})
}

const getBooksInYear = async function (req, res) {
    const checkYear= req.body.year
    
    let allBook= await BookModel.find( {year:checkYear})
    res.send({msg: allBook})
}

const getParticularBooks = async function (req, res) {
    //const name=req.body.bookName
    //const checkYear=req.body.year
    //let allBook= await BookModel.find({ bookName:name , year : checkYear   })
    let allBook= await BookModel.find( req.body)
    res.send({msg: allBook})
}

const getXINRBooks = async function (req, res) {
    
    let allBook= await BookModel.find( {  "prices.indianPrice":   { $in: ["100INR","200INR","500INR"] }  })
    res.send({msg: allBook})
}

const getRandomBooks = async function (req, res) {
    
    let allBook= await BookModel.find({  $or: [ {totalPages:{ $gt: 500   } } , {stockAvailable : true} ]  })
    res.send({msg: allBook})
}



//<--------------16 nov 2021 CURD operations----------------------->
// problem 1---->create books
const createNewBook = async function (req, res) {
    
    let savedBook= await newBookModel.create(req.body)
    res.send({msg: savedBook})
}

//problem 1-------> create author
const createAuthor = async function (req, res) {
    
    let savedAuthor= await authorModel.create(req.body)
    res.send({msg: savedAuthor})
}

// problem 2-------->get particular author book list
const getAuthorBook = async function (req, res) {
    let name=req.body.authorName
    let array=[]
    let savedAuthorBook= await newBookModel.find().populate({path:"author_id", match:{authorName:name}}) //author_id.authorName==req.body.name //author_id
    for(let i=0;i<savedAuthorBook.length;i++){
        if(savedAuthorBook[i].author_id != null){
            array.push(savedAuthorBook[i])
        }
    }
    res.send({msg: array})
}

//problem 3------> update price and get author name
const getAuthorNamePrice = async function (req, res) {
    let x=req.body.bookName
    let y=req.body.prices
     let bookDetails = await newBookModel.updateMany({bookName:x},{prices:y},{new:true})
    let book= await newBookModel.find({bookName: x}).populate({path:"author_id", select:"authorName"}).select({bookName:1,prices:1})
    res.send({msg : book} )
}

//problem 4------->find books in range of 50 to 100
const costBetweenBook = async function (req, res) {
    
    let book= await newBookModel.find({prices:{ $gte:50,$lte:100}}).populate({path:"author_id", select:"authorName"}).select({bookName:1,prices:1})
    res.send({msg : book} )
}







module.exports.createBook= createBook
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks

//16 nov 2021
module.exports.createNewBook= createNewBook
module.exports.createAuthor= createAuthor
module.exports.getAuthorBook= getAuthorBook
module.exports.getAuthorNamePrice= getAuthorNamePrice
module.exports.costBetweenBook=costBetweenBook




// //all author list
// const authorList = async function (req, res) {
//     let allAuthor= await authorModel.find()
//     res.send({msg: allAuthor})
// }
// // get all book list
// const newBookList = async function (req, res) {
//     let allNewBook= await newBookModel.find()
//     res.send({msg: allNewBook})
// }
// //update book author id
// const updateBook = async function (req, res) {
//     let y=req.body.bookName
//     let z=req.body.author_id
//     let upbook=await newBookModel.updateMany({bookName:y},{author_id: z})
//     let book= await newBookModel.find({bookName:y})
//     res.send({msg: book})
// }
// module.exports.authorList= authorList
// module.exports.newBookList= newBookList
// module.exports.updateBook= updateBook






// const getBooksData= async function (req, res) {

//         // let allBooks= await BookModel.find()
//         // let allBooks= await BookModel.find().count()
//         // let allBooks= await BookModel.find( { sales: 0 } )
//         // let allBooks= await BookModel.find( { sales: 0 } ).count()

//         //and is when all the conditions have to be true
//         // or is when even if any condition is true , it is included
//         // let allBooks= await BookModel.find( { sales: 0 , isPublished : false} )
//         // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  } )  
//         // let allBooks= await BookModel.find(  {  $or: [ {sales: 0} , {isPublished : false} ]  }  ).count()             
//         //  allBooks= await SalesModel.find({phoneName: "OnePlus7", createdAt: {$gt:"21-03-1999"}  }  ).count()             


//         // let allBooks= await BookModel.find( {  sales:   { $gt: 10}     }  )
//         // let allBooks= await BookModel.find( {  sales:   { $lt: 10}     }  )

        
//         // let allBooks= await BookModel.find( {  sales:   { $gte: 10   }    }  )
//         // let allBooks= await BookModel.find( {  sales:   { $lte: 10   }    }  )

//         // let allBooks= await BookModel.find( {  sales:   { $ne: 0   }    }  )
//         // let allBooks= await BookModel.find( {  sales:   { $in: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )
//         // let allBooks= await BookModel.find( {  sales:   { $nin: [ 0, 100, 4 , 1 ,2 ,3]   }     }  )


//         // let allBooks= await BookModel.find( ).sort(  { bookName: 1 } ) //ascending sort

//         // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: -1 } ) //descending sort :-1

//         // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2) //limit will give only next 2 elements

//         // let allBooks= await BookModel.find( {  sales:   { $gt: 0   }    }  ).sort(  { bookName: 1 } ).limit(2).skip( 3 ) //SKIP is used for pagination
//         // let allBooks= await BookModel.find( {  sales: { $gt: 0   }  } ).select( { bookName: 1, sales: 1, _id: 0 } )


//         // let allBooks= await BookModel.findById(     mongoose.Types.ObjectId('61922aacac5fa8b15518d590') )




//         // REGULAR EXPRESSIONS(regex) : 

//         // let allBooks= await BookModel.find( {  bookName: /.*Node.*/i   } ) //has the word Node 
//         // let allBooks= await BookModel.find( {  bookName: /Node$/i   } ) //ends with Node
//         // let allBooks= await BookModel.find( {  bookName: /^Intro/i   } ) //starts with Node

//         let a=5
//         let b=6
//         let c=  a+b
//         console.log(c)



        
//         let allBooks= await BookModel.find( { "prices.europeanPrice" : "4Pounds"} ) // without await, this line will start to get executed..but the server will move to next line without COMPLETING the execution..this might cause code to break in the next few lines
//         // hence we use await to ask the program to wait for the completion of this line..till this line completes, execution wont move to next line

//         // await is typically used at 2 places:
//             //- intearacting with database
//             //- calling another service (axios)..will be covered next week


//         //NOTE: await can not be used inside array functions like forEach / map / filter etc..self discovery and do post 

//         res.send({msg: allBooks})        
//     }

// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData