const AuthorModel= require("../models/authorModel.js")

//------------------------------------------------------------------------------------------


//-------------------------------1st-CREATE AUTHOR--------------------------------------------------------
const createAuthor= async function (req, res){
try{
    let data= req.body
    let savedData= await AuthorModel.create(data);
    res.status(201).send({status:true,data: savedData});
}catch(error){
    res.status(500).send({message:"failed",error:error.message});
}    
};


module.exports.createAuthor= createAuthor




//-------------------------------------------------------------------------------------------



























// //problem 1
// const createAuthor= async function (req, res) {
//     var data= req.body
//     let savedData= await authorModel.create(data)
//     res.send({msg: savedData})    
// }


// const getAuthors= async function (req, res) {
//     let allAuthors= await authorModel.find()
//     res.send({data: allAuthors})
// }

// module.exports.createAuthor= createAuthor
// module.exports.getAuthors= getAuthors