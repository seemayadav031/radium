const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/colors', function (req, res) {
    res.send('this is another api!')
});

//1-->Create an endpoint for GET /movies that returns a list of movies. 
//Define an array of movies in your code and return the value in response.

router.get('/movies', function (req, res) {
    const arr = ["DDLJ", "Phir Hera Pheri"]
    res.send(arr)
});

//2-->Create an endpoint GET movies/indexNumber (For example GET /movies/1 is 
//a valid request and it should return the movie in your array at index 1). 
//You can define an array of movies again in your api

//3-->Handle a scenario in problem 2 where if the index is greater than the valid
// maximum value a message is returned that tells the user to use a valid index in an error message.

router.get('/movies/:index', function (req, res) {
    const arr = ["shole", "ram lakhsman", "spider man", "super man", "wonder women"]
    const val = req.params.index
    //console.log(val)
    if (val > arr.length - 1 || val < 0) {
        res.send("index is out of range")
    } else {
        res.send(arr[val])
    }
});


//4-->Write another api called GET /films. Instead of an array of strings define an array of
//movie objects this time. Each movie object should have values - id, name
//Return the entire array in this api’s response

router.get('/films', function (req, res) {
    const arr = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Demo'
    }]
    res.send(arr)


});


//5-->Write api GET /films/:filmId where filmId is the value received in request path params.
//Use this value to return a movie object with this id. In case there is no such movie present
// in the array, return a suitable message in the response body.

router.get('/films/:filmId', function (req, res) {
    const arr = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Demo'
    }]


    const val = req.params.filmId
    //const val=Number(req.params.filmId)

    let ind = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == val) {
            ind = i;
        }
    }
    if (ind !== -1) {
        res.send(arr[ind])
    } else {
        res.send("no movie found")
    }
});


//Date 11/nov/2021 assignment 
//-----------FIND MISSING NUMBER FROM CONSICUTIVE NUMBER ARRAY-----------
router.post("/missingNumber", function (req, res) {
    const arr = req.body.entries
    const first = arr[0]
    const last = arr[arr.length - 1]
    let sum = 0
    let arrSum = 0
    for (let i = first; i <= last; i++) {
        sum = sum + i;
    }
    for (let j = 0; j < arr.length; j++) {
        arrSum = arrSum + arr[j];
    }
    let numberMissing = sum - arrSum;
    res.send("Missing Number is : " + numberMissing)
});

//DATE 12/nov/2021 
//----------------PROBLEM 1---------------
const moviesArr = [{
    "id": 1,
    "name": "Amadeus",
    "rating": 1,
    "director": "Milos Forman",
    "genre": "Action"
    },
    {
        "id": 2,
        "name": "The Hurt Locker",
        "rating": 2,
        "director":"Kathryn Bigelow",
        "genre":"Thriller"
    },
    {
        "id": 3,
        "name": "Mad Max",
        "rating": 3,
        "director":"George Miller",
        "genre":"comedy"
    },
    {
        "id": 4,
        "name": "The Truman Show",
        "rating": 4,
        "director":"Peter Weir",
        "genre":"Thriller"
    }
    ]

    router.get('/specific-movies', function (req, res) {
        const x=req.query.rating
        const y=req.query.genre
        const movies =moviesArr.filter(movie => movie.rating==x && movie.genre==y)
        res.send({"movies":movies})     
    });


    //------------PROBLEM 2---------------------
    router.post('/specific-movies', function (req, res){
         const updateArray=req.body
         //--------for PROBLEM 4------------------
         if(updateArray.rating>10 && !updateArray.hasOwnProperty("director")){
             res.send("Invalid Rating and No director value present")
         }else if(updateArray.rating>10 || !updateArray.hasOwnProperty("director")){
             if(updateArray.rating>10){
                 res.send("Invalid Rating")
             }else{
                 res.send("No director")
             }
         }else{
         moviesArr.push(updateArray)
         res.send(moviesArr)
         }
    });

//-----------------PROBLEM 3---------------------
router.get('/best-movies', function (req, res){
    let highest=moviesArr[0].rating
    let index=0
    for(let i=1;i<moviesArr.length;i++){
        if(highest<moviesArr[i].rating){
           highest= moviesArr[i].rating
           index=i
        }
    }
    res.send(moviesArr[index])
});





module.exports = router;