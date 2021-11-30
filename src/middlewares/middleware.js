const jwt = require("jsonwebtoken");

const validation = async function(req,res,next){
    let data = req.body.email
    if(data) {
        const validEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
       if(data.match(validEmail)){
          next();

       }else{
           res.send({msg:"Invalid email Id"})
       }
    }else{
        res.send({msg:"No Email Id"})
    }
};

const checkAuthentication= function (req, res, next) {
    try{
    let token=req.headers["x-api-key"]
    if(token){
        let decodedToken=jwt.verify(token,"radiumIrs")
        if(decodedToken){
                req.validToken=decodedToken
                next()
        }else{
            res.status(401).send({msg:"token is not verified"})
        }
    }else{
        res.status(400).send({status:false,msg:"request is missing a mandatory token header"})
    }
}catch(error){
    res.status(500).send({status:false, msg:error.message})
} 

};




module.exports.checkAuthentication= checkAuthentication
module.exports={validation}

