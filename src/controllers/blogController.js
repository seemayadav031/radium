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




//-----------------------3 rd-GET BLOGS LIST-----------------------------------

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
     } else {
      res.status(404).send({ status: false, msg: "No blogs found" });
    }
  }catch(error) {
    res.status(500).send({ status: false, error: error.message });
  }
};



//-----------------------------4rth- UPDATE BLOG-------------------------------------
const updateBlog = async function (req, res) {
  try {

    let blogId = req.params.blogId
    let newTitle = req.body.title
    let newBody = req.body.body
    let newTags = req.body.tags
    let newSubCategory = req.body.subCategory
  
    let data = await blogModel.findOne({ _id: blogId })

    if (data.isDeleted == false && data) {
      let updatedata = await blogModel.findOneAndUpdate({ _id: blogId }, { title: newTitle, body: newBody, tags: newTags, subCategory: newSubCategory, publishedAt: new Date(), isPublished: true }, { new: true });
      res.status(200).send({ msg: "successfully updated", data: updatedata })
    }
    else {
      res.status(404).send({ msg: "data not found" })
    }

  }catch(error) {
    res.status(500).send({ message: "failed", error: error.message })
  }
};


//---------------------------------5th-DELETE BLOG WITH ID------------------------------------------------------------------------
const deleteBlogsWithId = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const blogDetail = await blogModel.findById(blogId);
    if (blogDetail && blogDetail.isDeleted == false) {

      let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: new Date() }, { new: true });

      res.status(200).send({ status: true, data: deletedBlog });
    } else {
      res.status(404).send({ status: false, msg: "Blog with this blog id doesn't exist" });
    }

  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }

};



//----------------------------6th-DELETE BLOG WITH QUERY-----------------------------------------------------------------------------
const deleteBlogsWithQuery = async function (req, res) {
  try {
    let deletedBlog;
    const irs = await blogModel.find({ isDeleted: false });
    console.log(irs);
    if (irs) {

      let authorId = req.query.authorId;
      let cat = req.query.category;
      let tag = req.query.tags;
      let pub = req.query.isPublished;
      let sub = req.query.subcategory;

      for (let i = 0; i < irs.length; i++) {
        if (irs[i].authorId == authorId || irs[i].category.filter(x => x == cat) == cat || irs[i].tags.filter(x => x == tag) == tag || irs[i].subcategory.filter(x => x == sub) == sub || irs[i].isPublished == pub) {
          deletedBlog = await blogModel.findOneAndUpdate({ _id: irs[i]["_id"] }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        }
      }
    }
    if (deletedBlog) {


      res.status(200).send({ status: true, data: deletedBlog });
    }
    else {
      res.status(404).send({ status: false, msg: "No blogs found" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message })
  }
}


module.exports.createBlogs = createBlogs;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlogsWithId = deleteBlogsWithId;
module.exports.deleteBlogsWithQuery = deleteBlogsWithQuery;








//----------------------------------------------------------------------------------------



// //problem 3 and 5
// const getBooks = async function (req, res) {
//   let allBooks = await bookModel.find().populate('author',["authorName" , "age"] );
//   res.send({ msg: allBooks });
// };





// module.exports.createBook = createBook;
// module.exports.getBooks = getBooks;



