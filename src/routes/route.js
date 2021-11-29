const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const middleware= require("../middlewares/middleware")
//----------------------------mini project--------------------------------------------------------

//----------------------API--------------------------------
router.post('/createAuthor', middleware.validation,AuthorController.createAuthor);
router.post('/blogs',  BlogController.createBlogs );
router.get('/blogs',  BlogController.getBlogs );
router.put('/blogs/:blogId',  BlogController.getBlogs );
router.delete('/blogs/:blogId',  BlogController.deleteBlogsWithId );
router.delete('/blogs',  BlogController.deleteBlogsWithQuery );

module.exports = router;











//-------------------------------------------------------------------------------------------------------

