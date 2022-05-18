const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please enter an offer name'],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, 'Please enter an offer description'],
    },
    neededSkills: {
        type: String,
        required: [true, 'Please add tags'],
    },
    appliants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    accepted: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    place: {
        type: String,
    },
    endDate: {
        type: Date,
        default: 'Not specified',
    },
    startDate: {
        type: String,
        required: [true, 'Please a starting date'],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    expireAt: Date,
}, {timestamps: true})

const Offer = mongoose.model('Offer', OfferSchema)

module.exports = Offer