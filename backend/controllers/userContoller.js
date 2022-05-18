const crypto = require('crypto')

const User = require('../models/User')

const Convo = require('../models/Convo')

const Offer = require('../models/Offer')

const Training = require('../models/Training')

const Internship = require('../models/Internship')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

const sendEmail = require('../utils/sendEmail')

// @desc     Authenticate user & get token
// @route    POST /api/users/login
// @access   Public
exports.authUser = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({email}).select('+password').populate('offers').populate('trainings').populate('compnayInternships')

    if (user && (await user.matchPassword(password))) {
        res.status(200)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            skills: user.skills,
            offers: user.offers,
            trainings: user.trainings,
            compnayInternships: user.compnayInternships,
            internships: user.internships,
            certifications: user.certifications,
            jobExperience: user.jobExperience,
            experiences: user.experiences,
            notifications: user.notifications,
            offerBookmarks: user.offerBookmarks,
            trainingBookmarks: user.trainingBookmarks,
            internshipBookmarks: user.internshipBookmarks,
            phone: user.phone,
            address: user.address,
            site: user.site,
            image: user.image,
            isAdmin: user.isAdmin,
            isCompany: user.isCompany,
            postalAddress: user.postalAddress,
            token: user.generateJWT()
        })
    } else {
        next(new ErrorResponse('Invalid email or password', 400))
    }
})

// @desc     Register user
// @route    POST /api/users
// @access   Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const { name, email, password, isCompany } = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        next(new ErrorResponse('User already exists', 400))
    }

    const user = await User.create({
        name,
        email,
        password,
        isCompany,
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            skills: user.skills,
            offers: user.offers,
            trainings: user.trainings,
            compnayInternships: user.compnayInternships,
            compnayInternships: user.compnayInternships,
            internships: user.internships,
            certifications: user.certifications,
            jobExperience: user.jobExperience,
            experiences: user.experiences,
            notifications: user.notifications,
            offerBookmarks: user.offerBookmarks,
            trainingBookmarks: user.trainingBookmarks,
            internshipBookmarks: user.internshipBookmarks,
            phone: user.phone,
            address: user.address,
            site: user.site,
            image: user.image,
            isAdmin: user.isAdmin,
            isCompany: user.isCompany,
            postalAddress: user.postalAddress,
            token: user.generateJWT()
        })
    } else {
        next(new ErrorResponse('Invalid user data', 400))
    }
})

// @desc     Forgot password
// @route    POST /api/users/forgotpassword
// @access   Public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
        const resetToken = user.getResetToken()

        await user.save({ validateBeforeSave: false })

        const resetUrl = `${req.body.protocol}://${req.body.hostname}:${req.body.port ? req.body.port : ''}/reset-password/${resetToken}`

        const message = `${user.name} are receiving this email because you have requested the reset of your password, please visit this link to update your password: ${resetUrl}`

        try {
            await sendEmail({
                email: user.email,
                subject: 'ESI JOB - Password Recovery',
                message
            })

            res.status(200).json({
                success: true,
                message: 'Email sent',
            })
        } catch (error) {
            console.log(error)
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })

            next(new ErrorResponse('Email could not be sent', 500))

        }
    } else {
        next(new ErrorResponse('Email address does not exist', 404))
    }
})

// @desc     Reset password
// @route    PUT /api/users/resetpassword/:resettoken
// @access   Public
exports.resetPassword = asyncHandler(async(req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if (user) {
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            skills: user.skills,
            offers: user.offers,
            trainings: user.trainings,
            compnayInternships: user.compnayInternships,
            compnayInternships: user.compnayInternships,
            internships: user.internships,
            certifications: user.certifications,
            jobExperience: user.jobExperience,
            experiences: user.experiences,
            notifications: user.notifications,
            offerBookmarks: user.offerBookmarks,
            trainingBookmarks: user.trainingBookmarks,
            internshipBookmarks: user.internshipBookmarks,
            phone: user.phone,
            address: user.address,
            site: user.site,
            image: user.image,
            isAdmin: user.isAdmin,
            isCompany: user.isCompany,
            postalAddress: user.postalAddress,
            token: user.generateJWT()
        })
    } else {
        next(new ErrorResponse('Reset link expired, try again', 404))
    }
})

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
exports.getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            skills: user.skills,
            offers: user.offers,
            trainings: user.trainings,
            compnayInternships: user.compnayInternships,
            compnayInternships: user.compnayInternships,
            internships: user.internships,
            certifications: user.certifications,
            jobExperience: user.jobExperience,
            experiences: user.experiences,
            notifications: user.notifications,
            offerBookmarks: user.offerBookmarks,
            trainingBookmarks: user.trainingBookmarks,
            internshipBookmarks: user.internshipBookmarks,
            phone: user.phone,
            address: user.address,
            site: user.site,
            image: user.image,
            isAdmin: user.isAdmin,
            isCompany: user.isCompany,
            postalAddress: user.postalAddress,
            token: user.generateJWT()
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc     Get user
// @route    GET /api/users/:userId
// @access   Public
exports.getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.userId).populate('offers trainings compnayInternships')

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            skills: user.skills,
            offers: user.offers,
            trainings: user.trainings,
            compnayInternships: user.compnayInternships,
            internships: user.internships,
            certifications: user.certifications,
            jobExperience: user.jobExperience,
            experiences: user.experiences,
            phone: user.phone,
            address: user.address,
            site: user.site,
            image: user.image,
            isCompany: user.isCompany,
            postalAddress: user.postalAddress,
            token: user.generateJWT()
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc     Update profile
// @route    PUT /api/users/profile
// @access   Private
exports.userProfileUpdate = asyncHandler(async(req, res, next) => {
    const {
         name, 
         email, 
         password, 
         image, 
         bio, 
         skills, 
         phone, 
         address, 
         site, 
         internships, 
         certifications, 
         jobExperience,
         postalAddress,
        } = req.body

    const user = await User.findById(req.user._id)

    const emailExists = await User.find({email})

    if (emailExists && (!req.user.email === email)) {
        return next(new ErrorResponse('Email already exists', 400))
    }

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.image = image || user.image
        user.bio = bio || user.bio
        user.skills = skills || user.skills
        user.phone = phone || user.phone
        user.address = address || user.address
        user.site = site || user.site
        user.internships = internships || user.internships
        user.certifications = certifications || user.certifications
        user.jobExperience = jobExperience || user.jobExperience
        user.postalAddress = postalAddress || user.postalAddress

        if (password) {
            user.password = password
        }

        const updatedUser = await user.save()
        
        res.status(200)
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            skills: updatedUser.skills,
            offers: updatedUser.offers,
            trainings: updatedUser.trainings,
            compnayInternships: updatedUser.compnayInternships,
            compnayInternships: updatedUser.compnayInternships,
            internships: updatedUser.internships,
            certifications: updatedUser.certifications,
            jobExperience: updatedUser.jobExperience,
            experiences: updatedUser.experiences,
            notifications: updatedUser.notifications,
            offerBookmarks: updatedUser.offerBookmarks,
            trainingBookmarks: updatedUser.trainingBookmarks,
            internshipBookmarks: updatedUser.internshipBookmarks,
            phone: updatedUser.phone,
            address: updatedUser.address,
            site: updatedUser.site,
            image: updatedUser.image,
            isAdmin: updatedUser.isAdmin,
            isCompany: updatedUser.isCompany,
            postalAddress: updatedUser.postalAddress,
            token: updatedUser.generateJWT()
        })
    } else {
        next(new ErrorResponse('User not found', 400))
    }
})

// @desc     Add user experience
// @route    POST /api/users/profile/experience
// @access   Private
exports.userAddExperience = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    const { title, company, startDate, endDate, desc, city } = req.body

    const experience = {
        title,
        company,
        startDate,
        endDate,
        desc,
        city,
    }
    
    if (experience) {
        user.experiences.push(experience)
    } else {
        next(new ErrorResponse('Please enter an experience', 400))
    }

    const updatedUser = await user.save()

    res.status(200)
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        offers: updatedUser.offers,
        trainings: updatedUser.trainings,
        compnayInternships: updatedUser.compnayInternships,
        compnayInternships: updatedUser.compnayInternships,
        internships: updatedUser.internships,
        certifications: updatedUser.certifications,
        jobExperience: updatedUser.jobExperience,
        experiences: updatedUser.experiences,
        notifications: updatedUser.notifications,
        offerBookmarks: updatedUser.offerBookmarks,
        trainingBookmarks: updatedUser.trainingBookmarks,
        internshipBookmarks: updatedUser.internshipBookmarks,
        phone: updatedUser.phone,
        address: updatedUser.address,
        site: updatedUser.site,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isCompany: updatedUser.isCompany,
        postalAddress: updatedUser.postalAddress,
        token: updatedUser.generateJWT()
    })
})

// @desc     Add user skill
// @route    POST /api/users/profile/skills
// @access   Private
exports.userAddSkill = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    const { name, perc } = req.body

    const skill = {
        name,
        perc,
    }
    
    if (skill) {
        user.skills.push(skill)
    } else {
        next(new ErrorResponse('Please enter a skill', 400))
    }

    const updatedUser = await user.save()

    res.status(200)
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        offers: updatedUser.offers,
        trainings: updatedUser.trainings,
        compnayInternships: updatedUser.compnayInternships,
        compnayInternships: updatedUser.compnayInternships,
        internships: updatedUser.internships,
        certifications: updatedUser.certifications,
        jobExperience: updatedUser.jobExperience,
        experiences: updatedUser.experiences,
        notifications: updatedUser.notifications,
        offerBookmarks: updatedUser.offerBookmarks,
        trainingBookmarks: updatedUser.trainingBookmarks,
        internshipBookmarks: updatedUser.internshipBookmarks,
        phone: updatedUser.phone,
        address: updatedUser.address,
        site: updatedUser.site,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isCompany: updatedUser.isCompany,
        postalAddress: updatedUser.postalAddress,
        token: updatedUser.generateJWT()
    })
})

// @desc     Delete user skill
// @route    DELETE /api/users/profile/skills
// @access   Private
exports.userDeleteSkill = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    const skillToDelete = user.skills.find(skill => skill._id.toString() === req.params.skillId.toString())

    if (skillToDelete) {
        user.skills = user.skills.filter(skill => skill._id.toString() !== req.params.skillId.toString())
    } else {
        next(new ErrorResponse('Skill not found', 404))
    }

    const updatedUser = await user.save()

    res.status(200)
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        offers: updatedUser.offers,
        trainings: updatedUser.trainings,
        compnayInternships: updatedUser.compnayInternships,
        compnayInternships: updatedUser.compnayInternships,
        internships: updatedUser.internships,
        certifications: updatedUser.certifications,
        jobExperience: updatedUser.jobExperience,
        experiences: updatedUser.experiences,
        notifications: updatedUser.notifications,
        offerBookmarks: updatedUser.offerBookmarks,
        trainingBookmarks: updatedUser.trainingBookmarks,
        internshipBookmarks: updatedUser.internshipBookmarks,
        phone: updatedUser.phone,
        address: updatedUser.address,
        site: updatedUser.site,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isCompany: updatedUser.isCompany,
        postalAddress: updatedUser.postalAddress,
        token: updatedUser.generateJWT()
    })
})

// @desc     Delete user field
// @route    PUT /api/users/profile
// @access   Private
exports.deleteUserField = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)

    const type = req.params.type

    if (user) {
        switch(type) {
            case 'phone':
                user.phone = ''
                break
            case 'address':
                user.address = ''
                break
            case 'website':
                user.site = ''
                break
            case 'postalAddress':
                user.postalAddress = ''
                break
        }

        const newUser = await user.save()

        res.json(newUser)
    } else {
        next(new ErrorResponse('User not found', 400))
    }
})

// @desc     Get all users & filtering
// @route    GET /api/users
// @access   Private
exports.getAllUsers = asyncHandler(async(req, res, next) => {
    let query

    let reqQuery = { ...req.query }

    const removeFields = ['select', 'sort', 'keyword']

    removeFields.forEach(param => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        match => `$${match}`
    )

    const alreadyMessaged = await Convo.find({ users: {$in : [req.user._id]}})
    
    let alreadyMessagedArr = []
    
    alreadyMessaged.map((item) => {
        alreadyMessagedArr = [...alreadyMessagedArr, ...item.users.filter(x => x._id !== req.user._id)] 
    })

    req.query.keyword && req.query.keyword !== '' ? 
        query = User.find({ _id: {$nin: alreadyMessagedArr}, isCompany: false, bio: {$exists: true}, skills: {$exists: true}, skills: {$elemMatch: {name: {$regex: req.query.keyword, $options: 'i'}}}, ...JSON.parse(queryStr) })
    :
        query = User.find({ _id: {$nin: alreadyMessagedArr}, isCompany: false, bio: {$exists: true}, skills: {$exists: true}, ...JSON.parse(queryStr) })

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }
    
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 15
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const tmpUsers = await query

    const total = tmpUsers.length

    req.query.keyword && req.query.keyword !== '' ? 
        query = User.find({ _id: {$nin: alreadyMessagedArr}, isCompany: false, bio: {$exists: true}, skills: {$exists: true}, skills: {$elemMatch: {name: {$regex: req.query.keyword, $options: 'i'}}}, ...JSON.parse(queryStr) })
    :
        query = User.find({ _id: {$nin: alreadyMessagedArr}, isCompany: false, bio: {$exists: true}, skills: {$exists: true}, ...JSON.parse(queryStr) })

    query = query.select('name bio image skills').skip(startIndex).limit(limit)
    
    const users = await query

    const pagination = {}

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }

    const nbrPages = Math.ceil(total / limit)
    
    if (users) {
        res.status(200)
        res.json({
            users,
            pagination,
            nbrPages,
            page,
        })
    } else {
        next(new ErrorResponse('Can\'t get users', 500))
    }
})

// @desc     Get student requests
// @route    GET /api/users/requests
// @access   Private
exports.getStudentRequests = asyncHandler(async(req, res, next) => {
    const offers = await Offer.find({appliants: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    const trainings = await Training.find({applicants: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    const internships = await Internship.find({appliants: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    
    let allStudentRequests = []

    if (offers) {
        allStudentRequests = [...allStudentRequests, ...offers]
    }
    
    if (trainings) {
        allStudentRequests = [...allStudentRequests, ...trainings]
    }

    if (internships) {
        allStudentRequests = [...allStudentRequests, ...internships]
    }

    res.status(200).json(allStudentRequests)
})

// @desc     Get student accepted requests
// @route    GET /api/users/requests/accepted
// @access   Private
exports.getStudentAcceptedRequests = asyncHandler(async(req, res, next) => {
    const offers = await Offer.find({accepted: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    const trainings = await Training.find({accepted: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    const internships = await Internship.find({accepted: {$in: [req.user._id]}}).populate({ path: 'company', select: 'name' })
    
    let allStudentAcceptedRequests = []

    if (offers) {
        allStudentAcceptedRequests = [...allStudentAcceptedRequests, ...offers]
    }
    
    if (trainings) {
        allStudentAcceptedRequests = [...allStudentAcceptedRequests, ...trainings]
    }

    if (internships) {
        allStudentAcceptedRequests = [...allStudentAcceptedRequests, ...internships]
    }

    res.status(200).json(allStudentAcceptedRequests)
})

// @desc     Add to bookmarks
// @route    POST /api/users/bookmarks
// @access   Private
exports.addToBookmarks = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    const { bookmarkId, docType } = req.body

    if (req.user._id.toString() === user._id.toString()) {
        if (!user.offerBookmarks.includes(bookmarkId) && !user.trainingBookmarks.includes(bookmarkId) && !user.internshipBookmarks.includes(bookmarkId)) {
            if (docType === 'offer') {
                user.offerBookmarks.push(bookmarkId)
            } else if (docType === 'training') {
                user.trainingBookmarks.push(bookmarkId)
            } else {
                user.internshipBookmarks.push(bookmarkId)
            }
            await user.save()
            res.status(200).json({})
        } else {
            next(new ErrorResponse('Already bookmarked', 400))
        }
    } else {
        next(new ErrorResponse('Unauthorized', 401))
    }
})

// @desc     Get bookmarks
// @route    GET /api/users/bookmarks
// @access   Private
exports.getBookmarks = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    if (req.user._id.toString() === user._id.toString()) {
        const offers = await User.findById(req.user._id).populate({
            path: 'offerBookmarks',
            select: 'name neededSkills createdAt company',
            populate: {
                path: 'company',
                select: 'name'
            }
        })
        const trainings = await User.findById(req.user._id).populate({
            path: 'trainingBookmarks',
            select: 'name tags createdAt price company',
            populate: {
                path: 'company',
                select: 'name'
            }
        })
        const internships = await User.findById(req.user._id).populate({
            path: 'internshipBookmarks',
            select: 'name tags createdAt company',
            populate: {
                path: 'company',
                select: 'name'
            }
        })

        let bookmarks = []

        if (offers) {
            bookmarks = [...bookmarks, ...offers.offerBookmarks]
        }

        if (trainings) {
            bookmarks = [...bookmarks, ...trainings.trainingBookmarks]
        }
        
        if (internships) {
            bookmarks = [...bookmarks, ...internships.internshipBookmarks]
        }

        res.status(200).json(bookmarks)
    } else {
        next(new ErrorResponse('Unauthorized', 401))
    }
})

// @desc     Delete bookmarks
// @route    PUT /api/users/bookmarks/:bookmarkId
// @access   Private
exports.deleteBookmark = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    const { docType } = req.body

    if (req.user._id.toString() === user._id.toString()) {
        if (docType === 'offer') {
            user.offerBookmarks = user.offerBookmarks.filter(bookmark => bookmark._id.toString() !== req.params.bookmarkId)
        } else if (docType === 'training') {
            user.trainingBookmarks = user.trainingBookmarks.filter(bookmark => bookmark._id.toString() !== req.params.bookmarkId)
        } else {
            user.internshipBookmarks = user.internshipBookmarks.filter(bookmark => bookmark._id.toString() !== req.params.bookmarkId)
        }

        await user.save()
        res.status(200).json({})
    } else {
        next(new ErrorResponse('Unauthorized', 401))
    }
})

// @desc     Mark notifications as read
// @route    PUT /api/users/markasread
// @access   Private
exports.markAsRead = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    user.notifications = []
    await user.save()

    res.status(200).json({})
})

// @desc     Mark a nofitication as read
// @route    PUT /api/users/markasread/:notificationId
// @access   Private
exports.markNotificationAsRead = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id)

    user.notifications = user.notifications.filter(x => x._id.toString() !== req.params.notificationId)
    await user.save()

    res.status(200).json({})
})
