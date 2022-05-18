const express = require('express')

const router = express.Router({ mergeParams: true })

const { 
    createInternship, 
    getAllInternships,
    getInternship,
    deleteInternship,
    addInternshipStudent,
    acceptStudent,
    deleteAcceptedStudent,
    publicInternship,
} = require('../controllers/internshipController')

const { protect, admin } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getAllInternships).post(protect, createInternship)
router.route('/:internshipId').get(protect, getInternship).delete(protect, deleteInternship).put(protect, admin, publicInternship)
router.route('/:internshipId/new').post(protect, addInternshipStudent)
router.route('/:internshipId/accept/:acceptedUser').put(protect, acceptStudent)
router.route('/:internshipId/accept/delete/:user').delete(protect, deleteAcceptedStudent)

module.exports = router