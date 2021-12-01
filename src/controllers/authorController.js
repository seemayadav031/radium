const authorModel= require("../models/authorModel.js")
const jwt=require('jsonwebtoken')
//------------------------------------------------------------------------------------------


//-------------------------------1st-CREATE AUTHOR------------------------------------------
const createAuthor= async function (req, res){
try{
    let data= req.body
    let savedData= await authorModel.create(data);
    res.status(201).send({status:true,data: savedData});
}catch(error){
    res.status(500).send({message:"failed",error:error.message});
}    
};


//--------------------------7th-AUTHOR LOGIN---------------------------------------------------
const login = async function (req, res) {
    try{
    let authorEmail = req.body.email
    let authorPassword = req.body.password
  
    let credentials = await authorModel.findOne({ email: authorEmail, password: authorPassword })
  
    if (credentials) {
      let payload = { authorId: credentials._id }
      let token = jwt.sign(payload, "radiumIrs")                                   //token generation
      res.status(200).send({ status: true, data: credentials._id, token: token })
    } else {
      res.status(400).send({ msg: "Invalid credentials " })
    }
  }catch(error){
    res.status(500).send({status:false, msg:error.message})
  }
  };

module.exports= {createAuthor,login};









//-------------------------------------------------------------------------------------------























