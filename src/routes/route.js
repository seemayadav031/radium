const express = require('express');

const router = express.Router();
const urlController = require("../controller/urlController")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/url/shorten', urlController.genrateShortUrl);
router.get('/urls/:urlCode', urlController.getUrl);
router.get('/getDetail', urlController.getDetail);




module.exports = router;