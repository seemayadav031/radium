const blogModel = require("../models/blogModel.js");
const authorModel = require("../models/authorModel.js")
const mongoose = require("mongoose");

//-------------------------------------------------------------------------------------



//---------------------2 nd-CREATE BLOGS--------------------
const createBlogs = async function (req, res) {
  try {
    let data = req.body
    if (data.isPublished == true) {
      data["publishedAt"] = new Date();
    }
    let authorId = req.body.authorId;
    const authorDetail = await authorModel.findById(authorId);
    if (authorDetail) {
      let savedData = await blogModel.create(data);
      res.status(201).send({ status: true, data: savedData })
    } else {
      res.status(400).send({ status: false, mg: "Invalid Request" })
    }

  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }

};




//-----------------------3 rd-GET BLOGS LIST----------------------------------------------------------

const getBlogs = async function (req, res) {
  try {
    const irs = await blogModel.find({ isdeleted: false, isPublished: true });
    if (irs) {
      let authorId = req.query.authorId;
      let cat = req.query.category;
      let tag = req.query.tags;
      let sub = req.query.subcategory;
      let arr = [];
      for (let i = 0; i < irs.length; i++) {
        if (irs[i].authorId == authorId || irs[i].category.filter(x => x == cat) == cat || irs[i].tags.filter(x => x == tag) == tag || irs[i].subcategory.filter(x => x == sub) == sub) {// || irs[i].category == category || irs[i].tags == tags){
          arr.push(irs[i]);
        }
      }
      res.status(200).send({ status: true, data: arr });
    }
    else {
      res.status(404).send({ status: false, msg: "No blogs found" });

    }
  } catch (err) {
    res.status(404).send({ status: false, error: error.message });
  }
};



//-----------------------------4rth- UPDATE BLOG--------------------------------------------------
const updateBlog = async function (req, res) {
  try {


  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message })
  }
};



//---------------------------5th-DELETE BLOG WITH ID------------------------------------------------------
const deleteBlogsWithId = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blogDetail = await blogModel.findById(blogId);
    if (blogDetail && blogDetail.isDeleted == false) {
      //data["publishedAt"]=new Date();
      //blogDetail["deletedAt"]=new Data(); 
      //let deletedBlog=await blogModel.findOneAndUpdate({_id:blogId},{isDeleted:true,deletedAt:new Date()},{new:true});
      let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });

      res.status(200).send({ status: true, data: deletedBlog });
    } else {
      res.status(404).send({ status: false, msg: "Blog with this blog id doesn't exist" });
    }

  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }

};



//----------------------------6th-DELETE BLOG WITH QUERY------------------------------------------------------------
const deleteBlogsWithQuery = async function (req, res) {
  try {
    const irs = await blogModel.find({ isdeleted: false });
    if (irs) {
      let authorId = req.query.authorId;
      let cat = req.query.category;
      let tag = req.query.tags;
      let pub = req.query.isPublished;
      let sub = req.query.subcategory;
      //let arr = [];
      for (let i = 0; i < irs.length; i++) {
        if (irs[i].authorId == authorId || irs[i].category.filter(x => x == cat) == cat || irs[i].tags.filter(x => x == tag) == tag || irs[i].subcategory.filter(x => x == sub) == sub) {// || irs[i].category == category || irs[i].tags == tags){
          //arr.push(irs[i]);
          arr= await blogModel.findAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
        }
      }
      res.status(200).send({ status: true, data: arr });
    }
    else {
      res.status(404).send({ status: false, msg: "No blogs found" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message })
  }
};


module.exports.createBlogs = createBlogs;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlogsWithId = deleteBlogsWithId;
module.exports.deleteBlogsWithQuery = deleteBlogsWithQuery;








//----------------------------------------------------------------------------------------


/**
 const express = require('express');
const data = require('./data');

// Initialize App
const app = express();

// Assign route
app.use('/', (req, res, next) => {
res.send('Node.js Search and Filter');
});

// Start server on PORT 5000
app.listen(5000, () => {
console.log('Server started!');
});

 */














// //problem 2
// const createBook = async function (req, res) {
//   const book = req.body;
//   const authorId = req.body.author
//   const publisherId = req.body.publisher
//   const aId = await authorModel.findById(authorId)
//   const pId = await publisherModel.findById(publisherId)


//   if (aId) {
//     if(pId){
//       let savedBook = await bookModel.create(book);
//       res.send({ msg: savedBook });
//     }else{
//       res.send({msg:"Publisher id is not valid"})
//     }
//   } else {
//     res.send({ msg: "Author id is not valid" });
//   }
// };

// //problem 3 and 5
// const getBooks = async function (req, res) {
//   let allBooks = await bookModel.find().populate('author',["authorName" , "age"] );
//   res.send({ msg: allBooks });
// };





// module.exports.createBook = createBook;
// module.exports.getBooks = getBooks;


