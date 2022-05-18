const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

// @desc     Get all users
// @route    GET /api/admin/users
// @access   Private
exports.getUsers = asyncHandler(async(req, res, next) => {
        if (req.user.isAdmin) {
            let query = User.find({})

            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 16
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const total = await User.countDocuments()

            const nbrPages = Math.ceil(total / limit)

            query = query.skip(startIndex).limit(limit)

            const users = await query

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

            res.status(200).json({
                users,
                pagination,
                nbrPages,
                page,
            })
        } else {
            next(new ErrorResponse('Unauthorized as admin', 401))
        }
})

// @desc     Get single user
// @route    GET /api/admin/users/:id
// @access   Private
exports.getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (req.user.isAdmin) {
            res.status(200).json(user)
        } else {
            next(new ErrorResponse('Unauthorized as admin', 401))
        }
    } else {
        next(new ErrorResponse('User not found', 404))
    }
})

// @desc     Delte user
// @route    DELETE /api/admin/users/:id
// @access   Private
exports.deleteUser = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.params.id)

    if (user) {
        if (req.user.isAdmin) {
            user = await User.findByIdAndDelete(req.params.id)
            res.status(204).json({})
        } else {
            next(new ErrorResponse('Unauthorized as admin', 401))
        }
    } else {
        next(new ErrorResponse('User not found', 404))
    }
})

// @desc     User to admin
// @route    PUT /api/admin/users/:id
// @access   Private
exports.userToAdmin = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.params.id)

    if (user) {
        if (req.user.isAdmin) {
            user = await User.findByIdAndUpdate(req.params.id, {
                isAdmin: req.body.isAdmin,
            }, {
                new: true,
                runValidators: true,
            })
            res.status(200).json({})
        } else {
            next(new ErrorResponse('Unauthorized as admin', 401))
        }
    } else {
        next(new ErrorResponse('User not found', 404))
    }
})