const Training = require('../models/Training')
const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

// @desc     Create training
// @route    POST /api/trainings
// @access   Private
exports.createTraining = asyncHandler(async(req, res, next) => {
    const { name, desc, place, price, tags, startDate, endDate, expireAt } = req.body

    const training = new Training({
        company: req.user._id,
        name,
        desc,
        price,
        place,
        startDate,
        endDate,
        tags,
        expireAt,
    })

    const createdTraining = await training.save()

    if (createdTraining) {
        res.status(201).json(createdTraining)
    } else {
        next(new ErrorResponse('Couldn\'t create training', 500))
    }
})

// @desc     Update training to public
// @route    PUT /api/trainings/:trainingId
// @access   Private
exports.publicTraining = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId)

    if (training) {
        if (req.user.isAdmin) {
            training.isPublic = req.body.isPublic
            await training.save({ validateBeforeSave: false })
            res.status(200).json({})
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})

// @desc     Get all trainings
// @route    GET /api/trainings
// @route    GET /api/users/:companyId/trainings
// @access   Private
exports.getAllTrainings = asyncHandler(async(req, res, next) => {
    let query

    if (req.params.companyId) {
        const trainings = await Training.find({ company: req.params.companyId }).populate({
            path: 'company',
            select: 'name',
        }).populate({
            path: 'applicants',
            select: 'name image address',
        }).populate({
            path: 'accepted',
            select: 'name image address',
        })

        if (trainings) {
            res.status(200).json(trainings)
        } else {
            next(new ErrorResponse('No trainings were found', 404))
        }
    } else {

        if (!req.query.keyword) {
            if (!req.user.isAdmin) {
                query = Training.find({ isPublic: true, endDate: { $gt: Date.now() } }).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Training.find({}).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        } else {
            if (!req.user.isAdmin) {
                query = Training.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Training.find({}).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        }

        const tmpTrainings = await query

        const total = tmpTrainings.length

        const limit = parseInt(req.query.limit, 10) || 16

        const nbrPages = Math.ceil(total / limit)

            if (!req.query.keyword) {
                if (!req.user.isAdmin) {
                    query = Training.find({ isPublic: true, endDate: { $gt: Date.now() }}).populate({
                        path: 'company',
                        select: 'name image'
                    })
                } else {
                    query = Training.find({}).populate({
                        path: 'company',
                        select: 'name image'
                    })
                }
            } else {
                if (!req.user.isAdmin) {
                    query = Training.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                        path: 'company',
                        select: 'name image'
                    })
                } else {
                    query = Training.find({ $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { tags: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                        path: 'company',
                        select: 'name image'
                    })
                }
            }

        const page = parseInt(req.query.page, 10) || 1
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        query = query.sort('-createdAt').skip(startIndex).limit(limit)

        const trainings = await query

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

        if (trainings) {
            res.status(200).json({
                trainings,
                pagination,
                page,
                nbrPages
            })
        } else {
            next(new ErrorResponse('No trainings were found', 404))
        }

    }

    
})

// @desc     Get single training
// @route    GET /api/trainings/:trainingId
// @access   Private
exports.getTraining = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId).populate({
        path: 'company',
        select: 'name image email address postalAddress site'
    })

    if (training) {
        if (!training.isPublic) {
            if (training.company._id.toString() === req.user._id.toString() || req.user.isAdmin) {
                res.status(200).json(training)
            } else {
                next(new ErrorResponse('Not authorized', 401))
            }
        } else {
            res.status(200).json(training)
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})

// @desc     Delete training
// @route    DELETE /api/trainings/:trainingId
// @access   Private
exports.deleteTraining = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId)

    if (training) {
        if (training.company.toString() === req.user._id.toString() || req.user.isAdmin) {
            await training.remove()
            res.status(204).json({})
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})

// @desc     Add student to training
// @route    POST /api/trainings/:trainingId/new
// @access   Private
exports.addTrainingStudent = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId)
    const company = await User.findById(training.company)

    if (training) {
        if (!training.applicants.includes(req.user._id)) {
            company.notifications.push({
                title: training.name,
                link: training._id,
                image: req.user.image,
                notificationType: 'apply',
            })
            await company.save({ validateBeforeSave: false })
            training.applicants.push(req.user._id)
            const newTraining = await training.save({ validateBeforeSave: false })
            res.status(200).json(newTraining)
        } else {
            next(new ErrorResponse('Already applied to this training', 401))
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})

// @desc     Accept student for training
// @route    POST /api/trainings/:trainingId/accept/:acceptedUser
// @access   Private
exports.acceptStudent = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId).populate({
        path: 'company',
        select: 'image',
    })
    const user = await User.findById(req.params.acceptedUser)
    
    if (training) {
        if (training.company._id.toString() === req.user._id.toString()) {
            if (training.applicants.includes(req.params.acceptedUser)) {
                if (!training.accepted.includes(req.params.acceptedUser)) {
                    user.notifications.push({
                        title: training.name,
                        link: training._id,
                        image: training.company.image,
                        notificationType: 'training'
                    })
                    await user.save({ validateBeforeSave: false })
                    training.accepted.push(req.params.acceptedUser)
                    training.applicants = training.applicants.filter(app => app.toString() !== req.params.acceptedUser.toString())
                    await training.save({ validateBeforeSave: false })
                    res.status(200).json({})
                } else {
                    next(new ErrorResponse('User already accepted', 400))
                }
            } else {
                next(new ErrorResponse('User must apply to the training first', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})

// @desc     Delete accepted student from training
// @route    DELETE /api/trainings/:trainingId/accept/delete
// @access   Private
exports.deleteAcceptedStudent = asyncHandler(async(req, res, next) => {
    const training = await Training.findById(req.params.trainingId)
    
    if (training) {
        if (training.company.toString() === req.user._id.toString()) {
            if (training.accepted.includes(req.params.user)) {
                training.accepted = training.accepted.filter(acc => acc.toString() !== req.params.user.toString())
                await training.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else if (training.applicants.includes(req.params.user)) {
                training.applicants = training.applicants.filter(acc => acc.toString() !== req.params.user.toString())
                await training.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else {
                next(new ErrorResponse('User has not applied to the training yet', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Training not found', 404))
    }
})
