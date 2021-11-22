const express = require('express');
const router = express.Router();

const OrderController= require("../controllers/orderController")
const userController= require("../controllers/userController")
const productController= require("../controllers/poductController")

const commonMW= require("../Middleware/commonMiddleware")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// Order API
router.post('/createOrder', commonMW.mid1, OrderController.createOrder );
router.get('/getOrder',  OrderController.getOrder  );

// User API
router.post('/createUser', commonMW.mid1, userController.createUser  );
router.get('/getUser',  userController.getUser  );

//Product API
router.post('/createProduct',  productController.createProduct  );
router.get('/getProduct',  productController.getProduct  );



module.exports = router;