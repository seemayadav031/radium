const mid1= function (req, res, next) {

    if(req.headers["isfreeapp"]!= null){
    next()
    }else{
        res.send({msg:"request is missing a mandatory header"})
    } 

}




module.exports.mid1= mid1