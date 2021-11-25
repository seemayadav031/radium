const express = require('express');
const router = express.Router();
const cowinController= require("../controllers/cowinController")

//<----------------------------------------------------------------------------------
//25 nov 2021

router.get('/getWeather',cowinController.getWeather);
router.get('/getTemprature',cowinController.getTemprature);
router.get('/getCityTemprature',cowinController.getCityTemprature);


//<----------------------------------------------------------------------------------



//<---------------------------practice api--------------------------------------------
router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)
router.post("/cowin/otp", cowinController.generateOtp)
router.post("/cowin/confirmation", cowinController.getConfirmation)





module.exports = router;