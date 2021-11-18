const bookModel = require("../models/bookModel.js");
const authorModel= require("../models/authorModel.js")
const mongoose = require("mongoose");

const createBook = async function (req, res) {
  const book = req.body;
  const authorId=req.body.author
  const Id=await authorModel.findById(authorId)
  
  if(Id){
  let savedBook = await bookModel.create(book);
  res.send({ msg: savedBook });
  }else{
    res.send({msg:"Author id not valid"});
  }
 };


const getBooks = async function (req, res) {
  let allBooks = await bookModel.find().populate('author');
  res.send({ msg: allBooks });
};





module.exports.createBook = createBook;
module.exports.getBooks = getBooks;


