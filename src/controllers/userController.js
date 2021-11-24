const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//<---------------------------------------23 nov -------------------------

//PROBLEM 1-REGISTER USER
const createUser = async function (req, res) {
  try{
  let data = req.body
  let savedData = await userModel.create(data)
  res.status(201).send({status:true, msg: savedData })
  }catch(error){
    res.status(500).send({status:false, msg:error.message})
  }
};

//PROBLEM 2-LOGIN USER
const login = async function (req, res) {
  try{
  let userName = req.body.userName
  let password = req.body.password

  let credentials = await userModel.findOne({ userName: userName, password: password, isDeleted: false })

  if (credentials) {
    let payload = { _id: credentials._id }
    let token = jwt.sign(payload, "radium")
    res.status(200).send({ status: true, data: credentials._id, token: token })
  } else {
    res.status(400).send({ msg: "Invalid credentials " })
  }
}catch(error){
  res.status(500).send({status:false, msg:error.message})
}
};

//PROBLEM 3-GET USER DETAILS (PROTECTED API)
const users = async function (req, res) {
  try{
  let userId = req.params.userId
  if (req.validToken._id == userId) {
    let userDetails = await userModel.findOne({ _id: userId, isDeleted: false })
    if (userDetails) {
      res.status(200).send({ status: true, msg: userDetails })
    } else {
      res.status(404).send({ status: false, msg: "user not found" })
    }
   } else {
     res.status(403).send({status: false, msg: "prohibited ,token id and user id didn't match" })
   }
  }catch(error){
    res.status(500).send({status:false, msg:error.message})
  }
};

//PROBLEM 4-UPDATE EMAIL (PROTECTED API) 
const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId
  let email = req.body.email
  if (req.validToken._id == userId) {
    let userDetails = await userModel.findOneAndUpdate({ _id: userId, isDeleted: false }, { email: email }, { new: true })
    if (userDetails) {
      res.status(200).send({ status: true, msg: userDetails })
    } else {
      res.status(404).send({ status: false, msg: "user not found" })
    }
  } else {
    res.status(403).send({ status:false,msg: "prohibited ,token id and user id didn't match" })
  }
}catch(error){
  res.status(500).send({status:false, msg:error.message})
}
};

//-------------------------------------------------------------------------------------------



const getUser = async function (req, res) {
  let allUser = await userModel.find();
  res.send({ msg: allUser });
};
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.users = users;
module.exports.updateUser = updateUser;

module.exports.getUser = getUser;