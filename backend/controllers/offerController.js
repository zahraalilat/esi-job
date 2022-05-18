const Offer = require('../models/Offer')
const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

// @desc     Create offer
// @route    POST /api/offers
// @access   Private
exports.createOffer = asyncHandler(async(req, res, next) => {
    const { name, desc, neededSkills, place, startDate, endDate, expireAt } = req.body

    const offer = new Offer({
        company: req.user._id,
        name,
        desc,
        neededSkills,
        place,
        startDate,
        endDate,
        expireAt,
    })

    const createdOffer = await offer.save()

    if (createdOffer) {
        res.status(201).json(createdOffer)
    } else {
        next(new ErrorResponse('Couldn\'t create offer', 400))
    }
})

// @desc     Make offer public
// @route    PUT /api/offers/:offerId
// @access   Private/Admin
exports.publicOffer = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId)

    if (offer) {
        if (req.user.isAdmin) {
            offer.isPublic = req.body.isPublic
            await offer.save({ validateBeforeSave: false })
            res.status(200).json({})
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

// @desc     Get all offers / Get company offers
// @route    GET /api/users/:companyId/offers
// @route    GET /api/offers
// @access   Public
exports.getAllOffers = asyncHandler(async(req, res, next) => {
    let query
    
    if (req.params.companyId) {
        const offers = await Offer.find({ company: req.params.companyId }).populate({
            path: 'company',
            select: 'name'
        }).populate({
            path: 'appliants',
            select: 'name image address'
        }).populate({
            path: 'accepted',
            select: 'name image address'
        })
        
        if (offers) {
            res.status(200).json(offers)
        } else {
            next(new ErrorResponse('No offers were found', 404))
        }
    } else {

        if (!req.query.keyword) {
            if (!req.user.isAdmin) {
                query = Offer.find({ isPublic: true, endDate: { $gt: Date.now() }}).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Offer.find({}).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        } else {
            if (!req.user.isAdmin) {
                query = Offer.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { neededSkills: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Offer.find({ $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { neededSkills: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        }

        const tmpOffers = await query

        const total = tmpOffers.length

        const limit = Number(req.query.limit) || 16

        const nbrPages = Math.ceil(total / limit)

        if (!req.query.keyword) {
            if (!req.user.isAdmin) {
                query = Offer.find({ isPublic: true, endDate: { $gt: Date.now() }}).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Offer.find({}).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        } else {
            if (!req.user.isAdmin) {
                query = Offer.find({ isPublic: true, endDate: { $gt: Date.now() }, $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { neededSkills: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name image'
                })
            } else {
                query = Offer.find({ $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { neededSkills: { $regex: req.query.keyword, $options: 'i' } }] }).populate({
                    path: 'company',
                    select: 'name image'
                })
            }
        }

        const page = Number(req.query.page) || 1
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        query = query.sort('-createdAt').skip(startIndex).limit(limit)

        const offers = await query

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

        if (offers) {
                res.status(200).json({
                    offers,
                    nbrPages,
                    pagination,
                    page,
                })
        } else {
            next(new ErrorResponse('No offers were found', 404))
        }
    }
})

// @desc     Get single offer
// @route    GET /api/offers/:offerId
// @access   Public
exports.getOffer = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId).populate({
        path: 'company',
        select: 'name image email phone address site postalAddress'
    })
    
    if (offer) {
        if (!offer.isPublic) {
            if (offer.company._id.toString() === req.user._id.toString() || req.user.isAdmin) {
                res.status(200).json(offer)
            } else {
                next(new ErrorResponse('Not authorized', 401))
            }
        } else {
            res.status(200).json(offer)
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

// @desc     Delete offer
// @route    DELETE /api/offers/:offerId
// @access   Public
exports.deleteOffer = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId)
    
    if (offer) {
        if (offer.company.toString() === req.user._id.toString() || req.user.isAdmin) {
            await offer.remove()
            res.status(204).json({})
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

// @desc     Add student to offer
// @route    POST /api/offers/:offerId/new
// @access   Private
exports.addOfferStudent = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId)
    const company = await User.findById(offer.company)
    
    if (offer) {
        if (!offer.appliants.includes(req.user._id)) {
            company.notifications.push({
                title: offer.name,
                link: offer._id,
                image: req.user.image,
                notificationType: 'apply',
            })
            await company.save({ validateBeforeSave: false })
            offer.appliants.push(req.user._id)
            const newOffer = await offer.save({ validateBeforeSave: false })
            res.status(204).json(newOffer)
        } else {
            next(new ErrorResponse('Already applied to this offer', 401))
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

// @desc     Accept student for offer
// @route    POST /api/offers/:offerId/accept/:acceptedUser
// @access   Private
exports.acceptStudent = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId).populate({
        path: 'company',
        select: 'image',
    })
    const user = await User.findById(req.params.acceptedStudent)

    if (offer) {
        if (offer.company._id.toString() === req.user._id.toString()) {
            if (offer.appliants.includes(req.params.acceptedUser)) {
                if (!offer.accepted.includes(req.params.acceptedUser)) {
                    user.notifications.push({
                        title: offer.name,
                        link: offer._id,
                        image: offer.company.image,
                        notificationType: 'offer'
                    })
                    await user.save({ validateBeforeSave: false })
                    offer.accepted.push(req.params.acceptedUser)
                    offer.appliants = offer.appliants.filter(app => app.toString() !== req.params.acceptedUser.toString())
                    await offer.save({ validateBeforeSave: false })
                    res.status(200).json({})
                } else {
                    next(new ErrorResponse('User already accepted', 400))
                }
            } else {
                next(new ErrorResponse('User must apply to the offer first', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

// @desc     Delete accepted student from offer
// @route    DELETE /api/offers/:offerId/accept/delete/:user
// @access   Private
exports.deleteAcceptedStudent = asyncHandler(async(req, res, next) => {
    const offer = await Offer.findById(req.params.offerId)
    
    if (offer) {
        if (offer.company.toString() === req.user._id.toString()) {
            if (offer.accepted.includes(req.params.user)) {
                offer.accepted = offer.accepted.filter(acc => acc.toString() !== req.params.user)
                await offer.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else if (offer.appliants.includes(req.params.user)) {
                offer.appliants = offer.appliants.filter(acc => acc.toString() !== req.params.user)
                await offer.save({ validateBeforeSave: false })
                res.status(200).json({})
            } else {
                next(new ErrorResponse('User has not applied to the offer yet', 400))
            }
        } else {
            next(new ErrorResponse('Unauthorized', 401))
        }
    } else {
        next(new ErrorResponse('Offer not found', 404))
    }
})

