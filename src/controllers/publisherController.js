const publisherModel= require("../models/publisherModel.js")

//problem 4
const createPublisher= async function (req, res) {
    var data= req.body
    let savedData= await publisherModel.create(data)
    res.send({msg: savedData})    
}


const getPublishers= async function (req, res) {
    let allPublisher= await publisherModel.find()
    res.send({data: allPublisher})
}

module.exports.createPublisher= createPublisher
module.exports.getPublishers= getPublishers