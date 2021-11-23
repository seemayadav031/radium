const userModel = require("../models/userModel.js");
const orderModel = require("../models/orderModel.js")
const productModel = require("../models/productModel.js")

//problem 1
const createOrder = async function (req, res) {
    const order = req.body;
    const userWithId = req.body.userId
    const productWithId = req.body.productId
    const uId = await userModel.findById(userWithId)
    const pId = await productModel.findById(productWithId)
    console.log(uId)
    console.log(pId)
    console.log(uId["balance"])
    console.log(req.headers["isfreeapp"])
    console.log(typeof req.headers["isfreeapp"])

    if (uId) {
        if (pId) {
                if (req.headers["isfreeapp"] == "false") {
                    
                    if (uId["balance"] >= pId["price"]){
                        let updateBalance = uId["balance"] - pId["price"];
                        await userModel.find({_id:userWithId}).update({balance:updateBalance,})
                        order["amount"] = pId["price"];
                        //order["isFreeAppUser"] = req.headers["isfreeapp"];
                        order["isFreeAppUser"]=req.isFreeAppUser;
                        order["date"]=new Date()
                        let savedOrder = await orderModel.create(order);
                        res.send({ msg: savedOrder });
                    } else {
                        res.send({ msg: "insufficent balance" })
                    }
                } else {
                    order["amount"] = 0;
                    //order["isFreeAppUser"] = req.headers["isfreeapp"];
                    order["isFreeAppUser"]=req.isFreeAppUser;
                    order["date"]=new Date()
                    let savedOrder = await orderModel.create(order);
                    res.send({ msg: savedOrder });
                }
            } else {
                res.send({ msg: "Product id is not valid" })
            }
        } else {
            res.send({ msg: "User id is not valid" });
        }
}


const getOrder = async function (req, res) {
    let allOrder = await orderModel.find({isFreeAppUser:"false"})
    res.send({ data: allOrder })
}

module.exports.createOrder = createOrder
module.exports.getOrder = getOrder