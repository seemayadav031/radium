const userModel = require("../models/userModel.js");
const orderModel = require("../models/orderModel.js")
const productModel = require("../models/productModel.js")
const mongoose = require("mongoose");

//problem 2
const createUser = async function (req, res) {
  let data= req.body
  //data["freeAppUser"]=req.headers["isfreeapp"];
  data["freeAppUser"]=req.isFreeAppUser;
  let savedData= await userModel.create(data)
  res.send({msg: savedData}) 
};

//problem 3 and 5
const getUser = async function (req, res) {
  let allUser = await userModel.find();
  res.send({ msg: allUser });
};





module.exports.createUser = createUser;
module.exports.getUser = getUser;


