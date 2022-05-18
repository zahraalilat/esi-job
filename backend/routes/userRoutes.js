const express = require('express')

const router = express.Router()

const {
    authUser,
    registerUser,
    getUserProfile,
    userProfileUpdate,
    deleteUserField,
    getAllUsers,
    userAddExperience,
    userAddSkill,
    userDeleteSkill,
    getStudentRequests,
    forgotPassword,
    resetPassword,
    getStudentAcceptedRequests,
    getBookmarks,
    addToBookmarks,
    deleteBookmark,
    markAsRead,
    getUser,
    markNotificationAsRead,
} = require('../controllers/userContoller')

const { protect } = require('../middlewares/authMiddleware')

const offerRoutes = require('./offerRoutes')
router.use('/:companyId/offers', offerRoutes)

const trainingRoutes = require('./trainingRoutes')
router.use('/:companyId/trainings', trainingRoutes)

const internshipRoutes = require('./internshipRoutes')
router.use('/:companyId/internships', internshipRoutes)

router.route('/').post(registerUser).get(protect, getAllUsers)
router.route('/login').post(authUser)
router.route('/requests/accepted').get(protect, getStudentAcceptedRequests)
router.route('/requests').get(protect, getStudentRequests)
router.route('/bookmarks').get(protect, getBookmarks)
router.route('/bookmarks').post(protect, addToBookmarks)
router.route('/bookmarks/:bookmarkId').put(protect, deleteBookmark)
router.route('/profile').get(protect, getUserProfile).put(protect, userProfileUpdate)
router.route('/markasread').put(protect, markAsRead)
router.route('/markasread/:notificationId').put(protect, markNotificationAsRead)
router.post('/profile/experience', protect, userAddExperience)
router.route('/profile/skills').post(protect, userAddSkill)
router.route('/profile/skills/:skillId').delete(protect, userDeleteSkill)
router.route('/profile/:type').put(protect, deleteUserField)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resettoken').put(resetPassword)
router.route('/:userId').get(protect, getUser)

module.exports = router