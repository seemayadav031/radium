const bookModel = require("../models/bookModel.js");
const authorModel = require("../models/authorModel.js")
const publisherModel = require("../models/publisherModel.js")
const mongoose = require("mongoose");

//problem 2
const createBook = async function (req, res) {
  const book = req.body;
  const authorId = req.body.author
  const publisherId = req.body.publisher
  const aId = await authorModel.findById(authorId)
  const pId = await publisherModel.findById(publisherId)


  if (aId) {
    if(pId){
      let savedBook = await bookModel.create(book);
      res.send({ msg: savedBook });
    }else{
      res.send({msg:"Publisher id is not valid"})
    }
  } else {
    res.send({ msg: "Author id is not valid" });
  }
};

//problem 3 and 5
const getBooks = async function (req, res) {
  let allBooks = await bookModel.find().populate('author',["authorName","age"]);
  res.send({ msg: allBooks });
};





module.exports.createBook = createBook;
module.exports.getBooks = getBooks;


