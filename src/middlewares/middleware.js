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
}
module.exports={validation}

