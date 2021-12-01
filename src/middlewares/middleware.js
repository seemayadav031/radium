const jwt = require("jsonwebtoken");

//-----------------------phase 1-EMAIL VALIDATION---------------------------------------------------------------
const emailValidation = async function(req,res,next){
    let data = req.body.email
    if(data) {
        const validEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;  //validating email through rgexp
       if(data.match(validEmail)){
          next();

       }else{
           res.send({msg:"Invalid email Id"})
       }
    }else{
        res.send({msg:"No Email Id"})
    }
};


//---------------------------phase 2-AUTHENTICATION CHECK--------------------------------------------------------------
const checkAuthentication= function (req, res, next) {
    try{
    let token=req.headers["x-api-key"]                            //header check
    if(token){
        let decodedToken=jwt.verify(token,"radiumIrs")            //validating token
        if(decodedToken){
                req.validToken=decodedToken                       //making accessible for protected api
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




module.exports={emailValidation,checkAuthentication}

