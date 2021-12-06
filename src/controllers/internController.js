const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')



//for field of request
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//for request body 
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

//for objectId
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//------------------- 2 - Register Interns --------------------------------------

const registerIntern = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })
            return
        }

        // Extract params
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const collegeName = req.body.collegeName;

        //Extract collegeId from collegeName
        const x = await collegeModel.findOne({ name: collegeName })
        const collegeId = x._id;

        // Validation starts
        if (!isValid(name)) {
            res.status(400).send({ status: false, message: 'Intern name is required' })
            return
        }


        if (!isValid(collegeId)) {
            res.status(400).send({ status: false, message: 'College id is required' })
            return
        }

        if (!isValidObjectId(collegeId)) {
            res.status(400).send({ status: false, message: `${collegeId} is not a valid college id` })
            return
        }



        if (!isValid(email)) {
            res.status(400).send({ status: false, message: `Email is required` })
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }

        const isEmailAlreadyUsed = await internModel.findOne({ email }); // {email: email} object shorthand property

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} email address is already registered` })
            return
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: `Intern Mobile number is required` })
            return
        }

        if (!(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile))) {
            res.status(400).send({ status: false, message: `Mobile number should be a valid number` })
            return
        }

        const isMobileAlreadyUsed = await internModel.findOne({ mobile }); // {logoLink: logoLink} object shorthand property

        if (isMobileAlreadyUsed) {
            res.status(400).send({ status: false, message: `${mobile} number is already registered` })
            return
        }


        const college = await collegeModel.findById(collegeId);

        if (!college) {
            res.status(400).send({ status: false, message: `College does not exit` })
            return
        }
        // Validation ends



        const internData = {
            name,
            email,
            mobile,
            collegeId,
        }

        const newIntern = await internModel.create(internData)
        res.status(201).send({ status: true, message: 'New intern registered successfully', data: newIntern })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}



//------------------------- 3 - get all details-------------------------------------------------
const collegeDetails = async function (req, res) {
    try {
        const Query = {}
        const queryParamss = req.query
        const x = await collegeModel.findOne({ name: req.query.collegeName })
        const collegeId = x._id;

        if (!isValidRequestBody(queryParamss)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college name' })
            return
        }

        if (isValidRequestBody(queryParamss) && x != null) {
            const name = req.query.collegeName
            Query['name'] = name

            if (isValid(collegeId) && isValidObjectId(collegeId)) {
                Query['fullName'] = x.fullName
                Query['logoLink'] = x.logoLink

            }
        } else {
            res.status(400).send({ status: false, message: 'College name not exist. Please provide valid college name' })
            return
        }

        const intrests = await internModel.find({ collegeId: collegeId }).select({ name: 1, email: 1, mobile: 1 })
        Query['intrests'] = intrests

        if (Array.isArray(intrests) && intrests.length === 0) {
            Query['intrests'] = "No interns found"
            res.status(404).send({ status: false, message: Query })
            return
        }

        res.status(200).send({ status: true, message: 'college Details', data: Query })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


module.exports.registerIntern = registerIntern
module.exports.collegeDetails = collegeDetails


const getIntern = async function (req, res) {
    let allUser = await internModel.find();
    res.send({ msg: allUser });
};

module.exports.getIntern = getIntern
















// const ObjectId = mongoose.Types.ObjectId
// const authorModel = require('../models/authorModel')
// const blogModel = require('../models/blogModel')

// const isValid = function(value) {
//     if(typeof value === 'undefined' || value === null) return false
//     if(typeof value === 'string' && value.trim().length === 0) return false
//     return true;
// }

// const isValidRequestBody = function(requestBody) {
//     return Object.keys(requestBody).length > 0
// }

// const isValidObjectId = function(objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }

// const createBlog = async function (req, res) {
//     try {
//         const requestBody = req.body;

//         if(!isValidRequestBody(requestBody)) {
//             res.status(400).send({status: false, message: 'Invalid request parameters. Please provide blog details'})
//             return
//         }

//         // Extract params
//         const {title, body, authorId, tags, category, subcategory, isPublished} = requestBody;

//         // Validation starts
//         if(!isValid(title)) {
//             res.status(400).send({status: false, message: 'Blog Title is required'})
//             return
//         }

//         if(!isValid(body)) {
//             res.status(400).send({status: false, message: 'Blog body is required'})
//             return
//         }

//         if(!isValid(authorId)) {
//             res.status(400).send({status: false, message: 'Author id is required'})
//             return
//         }

//         if(!isValidObjectId(authorId)) {
//             res.status(400).send({status: false, message: `${authorId} is not a valid author id`})
//             return
//         }

//         if(!isValid(category)) {
//             res.status(400).send({status: false, message: 'Blog category is required'})
//             return
//         }

//         const author = await authorModel.findById(authorId);

//         if(!author) {
//             res.status(400).send({status: false, message: `Author does not exit`})
//             return
//         }
//         // Validation ends

//         const blogData = {
//             title,
//             body,
//             authorId,
//             category,
//             isPublished: isPublished ? isPublished : false,
//             publishedAt: isPublished ? new Date() : null
//         }

//         if(tags) {
//             if(Array.isArray(tags)) {
//                 blogData['tags'] = [...tags]
//             }
//             if(Object.prototype.toString.call(tags) === "[object String]") {
//                 blogData['tags'] = [ tags ]
//             }
//         }

//         if(subcategory) {
//             if(Array.isArray(subcategory)) {
//                 blogData['subcategory'] = [...subcategory]
//             }
//             if(Object.prototype.toString.call(subcategory) === "[object String]") {
//                 blogData['subcategory'] = [ subcategory ]
//             }
//         }

//         const newBlog = await blogModel.create(blogData)
//         res.status(201).send({status: true, message: 'New blog created successfully', data: newBlog})
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({status: false, message: error.message});
//     }
// }

// const listBlog = async function (req, res) {
//     try {
//         const filterQuery = {isDeleted: false, deletedAt: null, isPublished: true}
//         const queryParams = req.query

//         if(isValidRequestBody(queryParams)) {
//             const {authorId, category, tags, subcategory} = queryParams

//             if(isValid(authorId) && isValidObjectId(authorId)) {
//                 filterQuery['authorId'] = authorId
//             }

//             if(isValid(category)) {
//                 filterQuery['category'] = category.trim()
//             }

//             if(isValid(tags)) {
//                 const tagsArr = tags.trim().split(',').map(tag => tag.trim());
//                 filterQuery['tags'] = {$all: tagsArr}
//             }

//             if(isValid(subcategory)) {
//                 const subcatArr = subcategory.trim().split(',').map(subcat => subcat.trim());
//                 filterQuery['subcategory'] = {$all: subcatArr}
//             }
//         }

//         const blogs = await blogModel.find(filterQuery)

//         if(Array.isArray(blogs) && blogs.length===0) {
//             res.status(404).send({status: false, message: 'No blogs found'})
//             return
//         }

//         res.status(200).send({status: true, message: 'Blogs list', data: blogs})
//     } catch (error) {
//         res.status(500).send({status: false, message: error.message});
//     }
// }

// const updateBlog = async function (req, res) {
//     try {
//         const requestBody = req.body
//         const params = req.params
//         const blogId = params.blogId
//         const authorIdFromToken = req.authorId

//         // Validation stats
//         if(!isValidObjectId(blogId)) {
//             res.status(400).send({status: false, message: `${blogId} is not a valid blog id`})
//             return
//         }

//         if(!isValidObjectId(authorIdFromToken)) {
//             res.status(400).send({status: false, message: `${authorIdFromToken} is not a valid token id`})
//             return
//         }

//         const blog = await blogModel.findOne({_id: blogId, isDeleted: false, deletedAt: null })

//         if(!blog) {
//             res.status(404).send({status: false, message: `Blog not found`})
//             return
//         }

//         if(blog.authorId.toString() !== authorIdFromToken) {
//             res.status(401).send({status: false, message: `Unauthorized access! Owner info doesn't match`});
//             return
//         }

//         if(!isValidRequestBody(requestBody)) {
//             res.status(200).send({status: true, message: 'No paramateres passed. Blog unmodified', data: blog})
//             return
//         }

//         // Extract params
//         const {title, body, tags, category, subcategory, isPublished} = requestBody;

//         const updatedBlogData = {}

//         if(isValid(title)) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$set')) updatedBlogData['$set'] = {}

//             updatedBlogData['$set']['title'] = title
//         }

//         if(isValid(body)) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$set')) updatedBlogData['$set'] = {}

//             updatedBlogData['$set']['body'] = body
//         }

//         if(isValid(category)) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$set')) updatedBlogData['$set'] = {}

//             updatedBlogData['$set']['category'] = category
//         }

//         if(isPublished !== undefined) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$set')) updatedBlogData['$set'] = {}

//             updatedBlogData['$set']['isPublished'] = isPublished
//             updatedBlogData['$set']['publishedAt'] = isPublished ? new Date() : null
//         }

//         if(tags) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$addToSet')) updatedBlogData['$addToSet'] = {}

//             if(Array.isArray(tags)) {
//                 updatedBlogData['$addToSet']['tags'] = { $each: [...tags]}
//             }
//             if(typeof tags === "string") {
//                 updatedBlogData['$addToSet']['tags'] = tags
//             }
//         }

//         if(subcategory) {
//             if(!Object.prototype.hasOwnProperty.call(updatedBlogData, '$addToSet')) updatedBlogData['$addToSet'] = {}
//             if(Array.isArray(subcategory)) {
//                 updatedBlogData['$addToSet']['subcategory'] = { $each: [...subcategory]}
//             }
//             if(typeof subcategory === "string") {
//                 updatedBlogData['$addToSet']['subcategory'] = subcategory
//             }
//         }

//         const updatedBlog = await blogModel.findOneAndUpdate({_id: blogId}, updatedBlogData, {new: true})

//         res.status(200).send({status: true, message: 'Blog updated successfully', data: updatedBlog});
//     } catch (error) {
//         res.status(500).send({status: false, message: error.message});
//     }
// }

// const deleteBlogByID = async function (req, res) {
//     try {
//         const params = req.params
//         const blogId = params.blogId
//         const authorIdFromToken = req.authorId

//         if(!isValidObjectId(blogId)) {
//             res.status(400).send({status: false, message: `${blogId} is not a valid blog id`})
//             return
//         }

//         if(!isValidObjectId(authorIdFromToken)) {
//             res.status(400).send({status: false, message: `${authorIdFromToken} is not a valid token id`})
//             return
//         }

//         const blog = await blogModel.findOne({_id: blogId, isDeleted: false, deletedAt: null })

//         if(!blog) {
//             res.status(404).send({status: false, message: `Blog not found`})
//             return
//         }

//         if(blog.authorId.toString() !== authorIdFromToken) {
//             res.status(401).send({status: false, message: `Unauthorized access! Owner info doesn't match`});
//             return
//         }

//         await blogModel.findOneAndUpdate({_id: blogId}, {$set: {isDeleted: true, deletedAt: new Date()}})
//         res.status(200).send({status: true, message: `Blog deleted successfully`})
//     } catch (error) {
//         res.status(500).send({status: false, message: error.message});
//     }
// }

// const deleteBlogByParams = async function (req, res) {
//     try {
//         const filterQuery = {isDeleted: false, deletedAt: null}
//         const queryParams = req.query
//         const authorIdFromToken = req.authorId

//         if(!isValidObjectId(authorIdFromToken)) {
//             res.status(400).send({status: false, message: `${authorIdFromToken} is not a valid token id`})
//             return
//         }

//         if(!isValidRequestBody(queryParams)) {
//             res.status(400).send({status: false, message: `No query params received. Aborting delete operation`})
//             return
//         }

//         const {authorId, category, tags, subcategory, isPublished} = queryParams

//         if(isValid(authorId) && isValidObjectId(authorId)) {
//             filterQuery['authorId'] = authorId
//         }

//         if(isValid(category)) {
//             filterQuery['category'] = category.trim()
//         }

//         if(isValid(isPublished)) {
//             filterQuery['isPublished'] = isPublished
//         }

//         if(isValid(tags)) {
//             const tagsArr = tags.trim().split(',').map(tag => tag.trim());
//             filterQuery['tags'] = {$all: tagsArr}
//         }

//         if(isValid(subcategory)) {
//             const subcatArr = subcategory.trim().split(',').map(subcat => subcat.trim());
//             filterQuery['subcategory'] = {$all: subcatArr}
//         }

//         const blogs = await blogModel.find(filterQuery);

//         if(Array.isArray(blogs) && blogs.length===0) {
//             res.status(404).send({status: false, message: 'No matching blogs found'})
//             return
//         }

//         const idsOfBlogsToDelete = blogs.map(blog => {
//             if(blog.authorId.toString() === authorIdFromToken) return blog._id
//         })

//         if(idsOfBlogsToDelete.length === 0) {
//             res.status(404).send({status: false, message: 'No blogs found'})
//             return
//         }

//         await blogModel.updateMany({_id: {$in: idsOfBlogsToDelete}}, {$set: {isDeleted: true, deletedAt: new Date()}})

//         res.status(200).send({status: true, message: 'Blog(s) deleted successfully'});
//     } catch (error) {
//         res.status(500).send({status: false, message: error.message});
//     }
// }

// module.exports = {
//     createBlog,
//     listBlog,
//     updateBlog,
//     deleteBlogByID,
//     deleteBlogByParams
// }
