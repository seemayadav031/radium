const obj1=require('./logger')
const obj2=require('./util/helper')
//const obj3=require('g:/Node_js/validator/formatter.js')
const obj3=require('../validator/formatter')


//for external package
const obj=require('underscore')
const objLodash=require('lodash')



obj1.log("Seema")
obj1.welcome()
console.log("url of logging system is"+obj1.endpoint)

obj2.printDate()
obj2.printMonth()
obj2.getBatchInfo()

obj3.changeToLowerCase()
obj3.changeToUpperCase()
obj3.toTrim()


console.log("-------------------------------------")
console.log(obj.first(["apple","banana","mango"],2))
console.log(obj.last(["apple","banana","mango"],2))
console.log(obj.first(["apple","banana","mango","chiku"]))

console.log("---------------------------------------")
console.log("--------CHUNK---------")
console.log(objLodash.chunk(['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'october', 'november','December'], 3))
console.log("--------TAIL---------")
console.log(objLodash.tail([1, 3, 5, 7,9,11,13,15,17,19]) )
console.log("--------UNION---------")
console.log(objLodash.union([2], [1, 2], [1,2,3,5], [5,3,4,1], [3,8,9]))
console.log("--------FROM PAIRS---------")
console.log(objLodash.fromPairs([["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]))