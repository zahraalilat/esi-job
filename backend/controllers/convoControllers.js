const Convo = require('../models/Convo')
const User = require('../models/User')

const asyncHandler = require('express-async-handler')

const ErrorResponse = require('../utils/ErrorResponse')

exports.startConvo = asyncHandler(async(req, res, next) => {
    const { receiver } = req.body

    const sender = req.user._id

    const users = [sender, receiver]

    const convo_msgs = []

    const convo = await Convo.create({
        users,
        convo_msgs,
    })

    if (convo) {
        res.status(201)
        res.json(convo)
    } else {
        next(new ErrorResponse('Cannot instantiate new conversation', 500))
    }
})

exports.newMessage = asyncHandler(async(req, res, next) => {
    const { convoId, message } = req.body

    const convo = await Convo.findById(convoId)

    const receiverId = convo.users.find(x => x.toString() !== req.user._id)

    const receiver = await User.findById(receiverId)
    if (!(receiver.notifications.some(x => x.link === convoId.toString()))) {
        receiver.notifications.push({
            title: req.user.name,
            link: convoId.toString(),
            image: req.user.image,
            notificationType: 'msg',
        })
    } else {
        receiver.notifications = receiver.notifications.filter(x => x.link !== convoId.toString())
        receiver.notifications.push({
            title: req.user.name,
            link: convoId.toString(),
            image: req.user.image,
            notificationType: 'msg',
        })
    }

    await receiver.save({ validateBeforeSave: false })

    message.sender = req.user._id

    convo.convo_msgs.push(message)

    const newConvo = await convo.save()

    if (newConvo) {
        res.status(201)
        res.json(newConvo)
    } else {
        next(new ErrorResponse('Message wasn\'t sent', 500))
    }
})

exports.getConvo = asyncHandler(async(req, res, next) => {
    const convoId = req.params.id

    const convo = await Convo.findById(convoId).populate({
        path: 'users',
        select: '-password'
    })

    const isConvoPart = convo.users.find(user => user._id.toString() === req.user._id.toString())

    if (convo && isConvoPart) {
        res.status(200)
        res.json(convo)
    } else {
        if (!convo) {
            next(new ErrorResponse('Conversation not found', 404))
        } else {
            next(new ErrorResponse('Unauthorized to read this conversation', 401))
        }
    }
})

exports.getUserConvos = asyncHandler(async(req, res, next) => {
    const convos = await Convo.find({users: {$in: [req.user._id]}}).populate('users').select('-password').sort({'_id': -1})

    if (convos) {
        res.status(200)
        res.json(convos)
    } else {
        next(new ErrorResponse('Conversations not found', 404))
    }
})

exports.getExistingConvo = asyncHandler(async(req, res, next) => {
    const convo = await Convo.findOne({ $and: [{users: {$in : [req.user._id]}}, {users: {$in: [req.params.receiverId]}}] }).populate('users').select('-password')

    if (convo) {
        res.status(200)
        res.json(convo._id)
    } else {
        next(new ErrorResponse('No existing conversation', 404))
    }
})
