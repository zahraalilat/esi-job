const express = require('express')

const router = express.Router({ mergeParams: true })

const { 
    createTraining, 
    getAllTrainings, 
    getTraining,
    deleteTraining,
    addTrainingStudent,
    acceptStudent,
    deleteAcceptedStudent,
    publicTraining,
} = require('../controllers/trainingController')

const { protect, admin } = require('../middlewares/authMiddleware')

router.route('/').post(protect, createTraining).get(protect, getAllTrainings)
router.route('/:trainingId').get(protect, getTraining).delete(protect, deleteTraining).put(protect, admin, publicTraining)
router.route('/:trainingId/new').post(protect, addTrainingStudent)
router.route('/:trainingId/accept/:acceptedUser').put(protect, acceptStudent)
router.route('/:trainingId/accept/delete/:user').delete(protect, deleteAcceptedStudent)

module.exports = router