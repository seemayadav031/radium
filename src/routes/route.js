const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/authorController")
const BlogController= require("../controllers/blogController")
const middleware= require("../middlewares/middleware")
//---------------------------------mini project--------------------------------------------------------


//----------------------API-------------PHASE 1----------------------------------------------------------
router.post('/createAuthor', middleware.emailValidation,AuthorController.createAuthor);

router.post('/blogs',middleware.checkAuthentication, BlogController.createBlogs);
router.get('/blogs', middleware.checkAuthentication, BlogController.getBlogs );

router.put('/blogs/:blogId', middleware.checkAuthentication, BlogController.updateBlog );
router.delete('/blogs/:blogId', middleware.checkAuthentication, BlogController.deleteBlogsWithId );
router.delete('/blogs',  middleware.checkAuthentication,BlogController.deleteBlogsWithQuery );


//---------------------Authentication API------PHASE 2------------------------------------------------------
router.post('/login',  AuthorController.login );

// router.put('/mblogs/:blogId', middleware.checkAuthentication, BlogController.midUpdateBlog );
// router.delete('/mblogs/:blogId', middleware.checkAuthentication, BlogController.midDeleteBlogsWithId );


//-----------------------------extra api---------------------------------------------------------------------
router.get('/getAuthors',  AuthorController.getAuthors );
router.get('/getBlogDetails',  BlogController.getBlogDetails );

module.exports = router;











//-------------------------------------------------------------------------------------------------------

