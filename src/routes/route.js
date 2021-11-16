const express = require('express');
const router = express.Router();
const UserModel= require("../models/bookModel")


const BookController= require("../controllers/bookController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//15 nov 20221

router.post('/createBook',  BookController.createBook  );
router.get('/bookList',  BookController.bookList );
router.post('/getBooksInYear',  BookController.getBooksInYear );
router.post('/getParticularBooks',  BookController.getParticularBooks );
router.get('/getXINRBooks',  BookController.getXINRBooks );
router.get('/getRandomBooks',  BookController.getRandomBooks );


//16 nov 2021
router.post('/createNewBook',  BookController.createNewBook  );
router.post('/createAuthor',  BookController.createAuthor  );
router.post('/getAuthorBook', BookController.getAuthorBook );
router.post('/getAuthorNamePrice', BookController.getAuthorNamePrice );
router.get('/costBetweenBook',  BookController.costBetweenBook );



//get author list
//router.get('/authorList',  BookController.authorList );
//router.get('/newBookList',  BookController.newBookList );
//router.post('/updateBook',  BookController.updateBook );


module.exports = router;