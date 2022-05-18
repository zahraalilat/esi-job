const express = require('express')

const router = express.Router({ mergeParams: true })

const { 
    getAllOffers, 
    createOffer, 
    getOffer, 
    deleteOffer,
    addOfferStudent,
    acceptStudent,
    deleteAcceptedStudent,
    publicOffer, 
} = require('../controllers/offerController')

const { protect, admin } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getAllOffers).post(protect, createOffer)
router.route('/:offerId').get(protect, getOffer).delete(protect, deleteOffer).put(protect, admin, publicOffer)
router.route('/:offerId/new').post(protect, addOfferStudent)
router.route('/:offerId/accept/:acceptedUser').post(protect, acceptStudent)
router.route('/:offerId/accept/delete/:user').delete(protect, deleteAcceptedStudent)

module.exports = router