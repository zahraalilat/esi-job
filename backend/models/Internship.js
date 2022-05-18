const mongoose = require('mongoose')

const InternshipSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please enter an internship name'],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, 'Please enter an internship description'],
    },
    tags: {
        type: String,
        required: true,
    },
    appliants: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
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
    paymentIncluded: {
        type: Boolean,
        default: false,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    expireAt: Date,
}, {timestamps: true})

const Internship = mongoose.model('Internship', InternshipSchema)

module.exports = Internship