const axios = require('axios')

//<--------------------------25 nov assignment-------------------------------------------------------------->
//PROBLEM 1

const getWeather = async function (req, res) {
    try {
        let city = req.query.q;
        let id = req.query.appid;
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`,
        }
        let response = await axios(options);
        console.log(response)
        res.status(200).send({ message: "Data fetch successfully", data: response.data })
    } catch (error) {
        res.status(500).send({ msg: "failed to fetch data", error: error.message })
    }
};


//PROBLEM 2
const getTemprature = async function (req, res) {
    try {
        let city = req.query.q;
        let id = req.query.appid;
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`,
        }
        let response = await axios(options);
        res.status(200).send({ message: "Data fetch successfully", Temprature: response.data.main.temp })
    } catch (error) {
        res.status(500).send({ msg: "failed to fetch data", error: error.message })
    }
};


//PROBLEM 3
const getCityTemprature = async function (req, res) {
    try {
        let city = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let id = req.query.appid;
        let tempratureArray = []
        let options
        for (let i = 0; i < city.length; i++) {

            options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${id}`,
            }
            let response = await axios(options);
            tempratureArray.push({ "city": city[i], "temp": response.data.main.temp })
        }

        tempratureArray.sort(function (a, b) { return parseFloat(a.temp) - parseFloat(b.temp) })
        res.status(200).send({ message: "Data fetch successfully", data: tempratureArray })
    } catch (error) {
        res.status(500).send({ msg: "failed to fetch data", error: error.message })
    }
};

module.exports.getWeather = getWeather;
module.exports.getTemprature = getTemprature;
module.exports.getCityTemprature = getCityTemprature;

//<--------------------------------------------------------------------------------------------------------



//url: 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=3893063f7d9cbd9e1db38cd8d0c9e21b',





















//<------------------------------25 nov 2021 practice------------------------------------------------------------>

const getStatesList = async function (req, res) {
    try {
        let options = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/states",
        };
        const cowinStates = await axios(options);

        console.log("WORKING");
        let states = cowinStates.data;
        res.status(200).send({ msg: "Successfully fetched data", data: states });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "Some error occured" });
    }

};


const getDistrictsList = async function (req, res) {

    try {
        let id = req.params.stateId
        console.log(" state: ", id)

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}` //plz take 5 mins to revise template literals here
        }
        let response = await axios(options)

        let districts = response.data

        console.log(response.data)
        res.status(200).send({ msg: "Success", data: districts })

    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ msg: "Something went wrong" })
    }
}


const generateOtp = async function (req, res) {
    try {

        let options = {
            method: "post",
            url: "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
            data: { "mobile": req.body.mobile }
        }
        let response = await axios(options)
        res.status(200).send({ msg: "success", data: response.data })



    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

const getConfirmation = async function (req, res) {
    try {
        let opt = req.body.opt
        let transaction = req.body.txnId
        let options = {
            method: "post",
            url: "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
            data: { "opt": opt, "txnId": transaction }
        }
        let response = await axios(options);
        res.status(200).send({ msg: "success", data: response.data })


    } catch (error) {
        res.status(500).send({ msg: "failed", error: error.message })

    }
}

module.exports.getStatesList = getStatesList;
module.exports.getDistrictsList = getDistrictsList;
module.exports.generateOtp = generateOtp;
module.exports.getConfirmation = getConfirmation;

//<-------------------------------------------------------------------------------------------------------------------->



/**
  let options = {
            method: "get",
            url: "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=232104&date=25-11-2021"
        }
 */