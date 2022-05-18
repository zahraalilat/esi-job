const User = require('../models/User')

const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Unauthorized, no token provided')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Unauthorized as admin')
    }
}

module.exports = {
    protect,
    admin
}