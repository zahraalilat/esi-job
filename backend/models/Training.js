const mongoose = require('mongoose')

const TrainingSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Please enter a training name'],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, 'Please enter a training description'],
    },
    place: {
        type: String,
        required: [true, 'Please enter a training place'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a training price'],
    },
    tags: String,
    endDate: {
        type: Date,
        default: 'Not specified',
    },
    startDate: {
        type: String,
        required: [true, 'Please a training starting date'],
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    accepted: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    expireAt: Date,
}, {
    timestamps: true,
})

const Training = mongoose.model('Training', TrainingSchema)

module.exports = Training