const express = require('express')

const router = express()

const { 
    startConvo,
    newMessage,
    getUserConvos,
    getConvo,
    getExistingConvo,
} = require('../controllers/convoControllers')

const { protect } = require('../middlewares/authMiddleware')

router.route('/').post(protect, startConvo).get(protect, getUserConvos)
router.route('/newmessage').post(protect, newMessage)
router.route('/exist/:receiverId').get(protect, getExistingConvo)
router.route('/:id').get(protect, getConvo)

module.exports = router