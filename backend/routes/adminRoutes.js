const express = require('express')

const router = express.Router()

const { 
    getUsers, 
    getUser, 
    userToAdmin, 
    deleteUser 
} = require('../controllers/adminController')

const { protect, admin } = require('../middlewares/authMiddleware')

router.use(protect)
router.use(admin)

// user-related routes
router.route('/users').get(getUsers)
router.route('/users/:id').get(getUser).put(userToAdmin).delete(deleteUser)

module.exports = router