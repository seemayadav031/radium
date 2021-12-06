const mongoose = require('mongoose')


const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: 'Intern name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    
        required: 'Email address is required',
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        },
        unique: true
    },
    mobile: {
        type: Number,
        required: 'Intern mobile number is required',
        validate: {
            validator: function (mobile) {
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile)
            }, message: 'Please fill a valid mobile number', isAsync: false
        },
        unique: true
    },
    collegeId: {
        required: 'College Id is required',
        type: mongoose.Types.ObjectId,
        refs: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema, 'interns')




























// const blogSchema = new mongoose.Schema({
//     title: {type: String, required: 'Blog title is required', trim: true},
//     body: {type: String, required: 'Blog body is required', trim: true},
//     authorId: {required: 'Blog Author is required', type: mongoose.Types.ObjectId, refs: 'Author'},
//     tags: [{type: String, trim: true}],
//     category: {type: String, trim: true, required: 'Blog category is required'},
//     subcategory: [{type: String, trim: true}],
//     isPublished: {type: Boolean, default: false},
//     publishedAt: {type: Date, default: null},
//     isDeleted: {type: Boolean, default: false},
//     deletedAt: {type: Date, default: null},
// }, { timestamps: true })

// module.exports = mongoose.model('Blog', blogSchema, 'blogs')