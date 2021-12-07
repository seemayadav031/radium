const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: 'College short name is required',
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        required: 'College full name is required',
        trim: true
    },
    logoLink: {
        type: String,
        required: 'Logo Link is required',
        trim: true,
        validate: {
                        validator: function (logoLink) {
                            return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(logoLink)
                        }, message: 'Please fill a valid logo link address', isAsync: false
                    }
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('college', collegeSchema, 'colleges')


















// const authorSchema = new mongoose.Schema({
//     fname: {
//         type: String,
//         required: 'First name is required',
//         trim: true,
//     },
//     lname: {
//         type: String,
//         required: 'Last name is required',
//         trim: true,
//     },
//     title: {
//         type: String,
//         enum: ['Mr', 'Mrs', 'Miss', 'Mast'],
//         required: 'Title is required',
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: 'Email address is required',
//         validate: {
//             validator: function (email) {
//                 return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
//             }, message: 'Please fill a valid email address', isAsync: false
//         }
//     },
//     password: {
//         type: String,
//         trim: true,
//         required: 'Password is required'
//     }
// }, { timestamps: true })

// module.exports = mongoose.model('Author', authorSchema, 'authors')