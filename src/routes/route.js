const express = require('express');
const router = express.Router();
const coinController= require("../controllers/coinController")


//<---------------------------------------------------------------------------------
//26 nov 2021
router.get('/getAssets',coinController.getAssets);




module.exports = router;