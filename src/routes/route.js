const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const BookController= require("../controllers/bookController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// Authors API
router.post('/createAuthors',  authorController.createAuthor  );
router.get('/getAuthors',  authorController.getAuthors  );

// Books API
router.post('/createBook',  BookController.createBook  );
router.get('/getBooks',  BookController.getBooks  );



module.exports = router;