const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const route = require('./routes/route.js');
const globalMiddleware = require('./Middleware/globalMiddleware.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// const midGlb= function (req, res, next) {
//     let date=moment().format();
//     let ip=req.ip;
//     let api=req.originalUrl;
//     console.log(date+"|"+ip+"|"+api);

//     //logic
//     next()    
// }
// app.use(midGlb)
// app.use(globalMiddleware.captureInfo)

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/seema_yadav_db?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});