const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/colors', function (req, res) {
    res.send('this is another api!')
});

router.get('/movies', function (req, res) {
    const arr=["DDLJ","Phir Hera Pheri"]
    res.send(arr)
});

router.get('/movies/:index', function (req, res) {
    const arr=["shole","ram lakhsman","spider man","super man","wonder women"]
    const val=req.params.index
    //console.log(val)
    if(val>arr.length-1 || val<0){
        res.send("index is out of range")
    }else{
    res.send(arr[val])
    }
});


router.get('/films', function (req, res) {
    const arr=[ {
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


router.get('/films/:filmId', function (req, res) {
    const arr=[ {
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

    
     const val=req.params.filmId
    //const val=Number(req.params.filmId)

    let ind=-1;

    for(let i=0;i<arr.length;i++){       
        if(arr[i].id == val){
             ind=i;
        }
    } 
    if(ind !== -1) {
    res.send(arr[ind])
    }else{
        res.send("no movie found") 
    }
});


module.exports = router;