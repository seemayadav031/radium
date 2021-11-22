const productModel= require("../models/productModel.js")

//problem 4
const createProduct= async function (req, res) {
    var data= req.body
    let savedData= await productModel.create(data)
    res.send({msg: savedData})    
}


const getProduct= async function (req, res) {
    let allProduct= await productModel.find()
    res.send({data: allProduct})
}

module.exports.createProduct= createProduct
module.exports.getProduct= getProduct