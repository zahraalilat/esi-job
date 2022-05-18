const Internship = require('../models/Internship')
const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

// @desc     Create internship
// @route    POST /api/internships
// @access   Private
exports.createInternship = asyncHandler(async(req, res, next) => {
    const { name, desc, place, tags, paymentIncluded, startDate, endDate, expireAt  } = req.body

    const internship = new Internship({
        company: req.user._id,
        name,
        desc,
        place,
        startDate,
        endDate,
        tags,
        paymentIncluded,
        expireAt,
    })

    const createdInternship = await internship.save()

    if (createdInternship) {
        res.status(201).json(createdInternship)
    } else {
        next(new ErrorResponse('Couldn\'t create internship', 500))
    }
})

// @desc     Update internship to public
// @route    PUT /api/internships/:internshipId
// @access   Private/Admin
exports.publicInternship = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId)

    if (internship) {
        if (req.user.isAdmin) {
            internship.isPublic = req.body.isPublic
            await internship.save({ validateBeforeSave: false })
            res.status(200).json({})
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})

// @desc     Get all internships
// @route    GET /api/internships
// @route    GET /api/users/:companyId/internships
// @access   Private
exports.getAllInternships = asyncHandler(async(req, res, next) => {
    let query

    if (req.params.companyId) {
        const internships = await Internship.find({ company: req.params.companyId }).populate({
            path: 'company',
            select: 'name',
        }).populate({
            path: 'appliants',
            select: 'name image address'
        }).populate({
            path: 'accepted',
            select: 'name image address'
        })

        if (internships) {
            res.status(200).json(internships)
        } else {
            next(new ErrorResponse('No internships were found', 404))
        }
    } else {
        
        if (req.query.keyword) {
            if (!req.user.isAdmin) {
                query = Internship.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name'
                })
            } else {
                query = Internship.find({}).populate({
                    path: 'company',
                    select: 'name'
                })
            }
        } else {
            if (!req.user.isAdmin) {
                query = Internship.find({ isPublic: true, endDate: { $gt: Date.now() } }).populate({
                    path: 'company',
                    select: 'name'
                })
            } else {
                query = Internship.find({}).populate({
                    path: 'company',
                    select: 'name'
                })
            }
        }

        const tmpInternships = await query

        const total = tmpInternships.length

        const limit = parseInt(req.query.limit) || 16

        const nbrPage = Math.ceil(total / limit)

        const page = parseInt(req.query.page) || 1
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        if (req.query.keyword) {
            if (!req.user.isAdmin) {
                query = Internship.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name'
                })
            } else {
                query = Internship.find({ $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name'
                })
            }
        } else {
            if (!req.user.isAdmin) {
                query = Internship.find({ isPublic: true, endDate: { $gt: Date.now() } }).populate({
                    path: 'company',
                    select: 'name'
                })
            } else {
                query = Internship.find({}).populate({
                    path: 'company',
                    select: 'name'
                })
            }
        }

        query = query.sort('-createdAt').skip(startIndex).limit(endIndex)

        const internships = await query

        const pagination = {}

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            }
        }
        
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            }
        }

        if (internships) {
            res.status(200).json({
                internships,
                pagination,
                nbrPage,
                page,
            })
        } else {
            next(new ErrorResponse('No internships were found', 404))
        }
    }
})

// @desc     Get single internship
// @route    GET /api/internships/internshipId
// @access   Private
exports.getInternship = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId).populate({
        path: 'company',
        select: 'name image email address postalAddress site'
    })

    if (internship) {
        if (!internship.isPublic) {
            if (internship.company._id.toString() === req.user._id.toString() || req.user.isAdmin) {
                res.status(200).json(internship)
            } else {
                next(new ErrorResponse('Not authorized', 401))
            }
        } else {
            res.status(200).json(internship)
        }
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})

// @desc     Delete internship
// @route    DELETE /api/internships/internshipId
// @access   Private
exports.deleteInternship = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId)

    if (internship) {
        await internship.remove()
        res.status(204).json({})
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})

// @desc     Add student to internship
// @route    POST /api/internships/:internshipId/new
// @access   Private
exports.addInternshipStudent = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId)
    const company = await User.findById(internship.company)

    if (internship) {
       if (!internship.appliants.includes(req.user._id)) {
           company.notifications.push({
                title: internship.name,
                link: internship._id,
                image: req.user.image,
                notificationType: 'apply',
           })
           await company.save({ validateBeforeSave: false })
           internship.appliants.push(req.user._id)
           const newInternship = internship.save({ validateBeforeSave: false })
           res.status(200).json(newInternship)
       } else {
           next(new ErrorResponse('Already applied to this internship', 401))
       }
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})

// @desc     Accept student for internship
// @route    POST /api/internships/:internshipId/accept/:acceptedUser
// @access   Private
exports.acceptStudent = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId).populate({
        path: 'company',
        select: 'image',
    })
    const user = await User.findById(req.params.acceptedUser)
    
    if (internship) {
        if (internship.company._id.toString() === req.user._id.toString()) {
            if (internship.appliants.includes(req.params.acceptedUser)) {
                if (!internship.accepted.includes(req.params.acceptedUser)) {
                    user.notifications.push({
                        title: internship.name,
                        link: internship._id,
                        image: internship.company.image,
                        notificationType: 'internship'
                    })
                    await user.save({ validateBeforeSave: false })
                    internship.accepted.push(req.params.acceptedUser)
                    internship.appliants = internship.appliants.filter(app => app.toString() !== req.params.acceptedUser.toString())
                    await internship.save({ validateBeforeSave: false })
                    res.status(200).json({})
                } else {
                    next(new ErrorResponse('User already accepted', 400))
                }
            } else {
                next(new ErrorResponse('User must apply to the internship first', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})

// @desc     Delete accepted student from internship
// @route    DELETE /api/trainings/:internshipId/accept/delete/:user
// @access   Private
exports.deleteAcceptedStudent = asyncHandler(async(req, res, next) => {
    const internship = await Internship.findById(req.params.internshipId)
    
    if (internship) {
        if (internship.company.toString() === req.user._id.toString()) {
            if (internship.accepted.includes(req.params.user)) {
                internship.accepted = internship.accepted.filter(acc => acc.toString() !== req.params.user.toString())
                await internship.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else if (internship.appliants.includes(req.params.user)) {
                internship.appliants = internship.appliants.filter(acc => acc.toString() !== req.params.user.toString())
                await internship.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else {
                next(new ErrorResponse('User has not applied to the internship yet', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Internship not found', 404))
    }
})
