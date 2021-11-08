// const str="     five space given both end     "
// str.trim()

// module.exports.trim=str


function changeToLowerCase(){
    const str="SEEMA"
    console.log(str.toLowerCase())
}

function changeToUpperCase(){
    const str="seema"
    console.log(str.toUpperCase())
}


function toTrim(){
    const str="       five space     "
    console.log(str.trim())
}


module.exports.changeToLowerCase=changeToLowerCase
module.exports.changeToUpperCase=changeToUpperCase
module.exports.toTrim=toTrim
