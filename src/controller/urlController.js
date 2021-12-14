
const validUrl = require('valid-url')
const randomString = require('randomstring')
const urlModel = require("../model/urlModel")
const axios = require('axios')

// ===========================================================================================================================================>
//connecting redis

const redis = require('redis')
const { promisify } = require('util')

const redisClient = redis.createClient(13142, "redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true });

redisClient.auth("F22C7UaLHXolOQqet2gUka5oRy9Aj3L3", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

// redis password= F22C7UaLHXolOQqet2gUka5oRy9Aj3L3
// redis enpoint = redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com:13142

// =======================================================================================================================================>

//validation functions

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number') return false
    return true;
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// ========================================================================================================================================>

//--------------------------------1st create short url--------------------------------------------------
const genrateShortUrl = async function (req, res) {
    try {
        let requestBody = req.body
        
        //validation start

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "body cant be empty please provide details" })
        }

        if (!isValid(requestBody.longUrl)) {
            return res.status(400).send({ status: false, msg: "please provide long url" })
        }

        if (!(validUrl.isWebUri(requestBody.longUrl.trim()))) {
            return res.status(400).send({ status: false, msg: "provide valid url" })
        }
       //validation end




        //console.log(requestBody.longUrl )

        //checing uniqueness of url
        let checkUrl = await urlModel.findOne({ longUrl: requestBody.longUrl })

        if (checkUrl) {
            return res.status(200).send({ status: true, msg: "This url already have shortUrl", data: checkUrl })
        }


        //checking url exist
        try {
            let reponse = await axios.get(`${requestBody.longUrl}`)
        } catch (error) {
            res.status(400).send({ status: false, msg: "this is invalid url" })
        }

        let urlCode = randomString.generate({ length: 5, charset: 'alphabetic' }).toLowerCase()

        let shortUrl = `http://localhost:3000/${urlCode}`

        requestBody.urlCode = urlCode
        requestBody.shortUrl = shortUrl

        let createUrl = await urlModel.create(requestBody)

        await SET_ASYNC(`${urlCode}`, JSON.stringify(createUrl))
        res.status(201).send({ status: true, data: createUrl })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// ================================================================================================================================================================================================>


const getUrl = async function (req, res) {
    try {

        let urlCode = req.params.urlCode.toLowerCase().trim()

        let cahcedUrlData = await GET_ASYNC(`${urlCode}`)
        
        let abc = JSON.parse(cahcedUrlData)
         if (!cahcedUrlData){
            return res.status(400).send({ status: false, msg: "this short url does not exist please provide valid url code " })
         }


        if (cahcedUrlData) {

            console.log("seema i am done")
            console.log(abc.longUrl)
            res.redirect(301, `${abc.longUrl}`);
            // res.send({data:cahcedUrlData})

        } else {
            let urlData = await urlModel.findOne({ urlCode: urlCode })
        if (!urlData) {
                 return res.status(400).send({ status: false, msg: "this short url does not exist please provide valid url code " })
            }
            await SET_ASYNC(`${urlCode}`, JSON.stringify(urlData))
          console.log("i am else part of api")

            res.redirect(301, `${urlData.longUrl}`);
            // res.send({data:urlData.longUrl})
        }
      } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


// ==================================================================================================================================================================================>


module.exports.genrateShortUrl = genrateShortUrl;
module.exports.getUrl = getUrl;






























    const getDetail = async function (req, res) {
        let allUser = await urlModel.find();
        res.send({ msg: allUser });
    };

    module.exports.getDetail = getDetail;