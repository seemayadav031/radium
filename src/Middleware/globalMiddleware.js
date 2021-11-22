const captureInfo= function (req, res, next) {
    let date= Date()   //moment().format();
    let ip=req.ip;
    let api=req.originalUrl;
    console.log(date+"|"+ip+"|"+api);

    //logic
    next()    
}
module.exports.captureInfo=captureInfo