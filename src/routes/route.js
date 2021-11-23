const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const commonMW= require("../Middleware/commonMiddleware")

//<-------------------------------------------------------------------------------------

router.post('/createUser',  userController.createUser  );
router.post('/login',  userController.login  );
router.get('/users/:userId', commonMW.checkAuthentication, userController.users  );
router.put('/updateUser/:userId', commonMW.checkAuthentication, userController.updateUser );
//-----------------------------------------------------------------------------------------

router.get('/getUser',  userController.getUser  );


module.exports = router;