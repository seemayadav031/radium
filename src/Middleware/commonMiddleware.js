const mid1= function (req, res, next) {

    if(req.headers["isfreeapp"]!= null){
        //update
        req.isFreeAppUser=req.headers["isfreeapp"]//this req.isFreeAppUser become global
    next()
    }else{
        res.send({msg:"request is missing a mandatory header"})
    } 

}




module.exports.mid1= mid1