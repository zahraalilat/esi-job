const mongoose = require('mongoose')

const ConvoSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    convo_msgs: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId
            },
            msg_body: {
                type: String,
                required: true,
            },
            sentAt: {
                type: Date,
                default: Date.now,
            },
            seen: {
                type: Boolean,
                default: false,
            }
        }
    ]
}, {timestamps: true})

const Convo = mongoose.model('Convo', ConvoSchema)

module.exports = Convo