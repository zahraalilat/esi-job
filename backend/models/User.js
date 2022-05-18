const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Password too short'],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    bio: {
        type: String,
    },
    skills: [
        {
            name: {
                type: String,
                required: [true, 'Please enter skill name']
            },
            perc: {
                type: Number,
                default: 10,
            }
        }
    ],
    experiences: [{
        title: {
            type: String,
        },
        company: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        desc: {
            type: String,
        },
        city: {
            type: String,
        }
    }],
    jobExperience: {
        type: Number,
        default: 0,
    },
    certifications: {
        type: Number,
        default: 0,
    },
    internships: {
        type: Number,
        default: 0,
    },
    notifications: [
        {
            title: String,
            in: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            link: String,
            image: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
            notificationType: String,
        }
    ],
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    site: {
        type: String,
    },
    image: {
        type: String,
        default: '/images/default-user.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isCompany: {
        type: Boolean,
        befault: false,
    },
    postalAddress: String,
    offerBookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        },
    ],
    trainingBookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Training'
        },
    ],
    internshipBookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship'
        },
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.pre('remove', async function(next) {
    await this.model('Offer').deleteMany({ company: this._id })
    next()
})

UserSchema.pre('remove', async function(next) {
    await this.model('Training').deleteMany({ company: this._id })
    next()
})

UserSchema.pre('remove', async function(next) {
    await this.model('Internship').deleteMany({ company: this._id })
    next()
})

UserSchema.pre('remove', async function(next) {
    await this.model('Convo').deleteMany({ users: { $in: [this._id] } })
    next()
})

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.generateJWT = function() {
    return jwt.sign(
        {userId: this._id},
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

UserSchema.methods.getResetToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken
}

UserSchema.virtual('offers', {
    ref: 'Offer',
    localField: '_id',
    foreignField: 'company',
    justOne: false,
})

UserSchema.virtual('trainings', {
    ref: 'Training',
    localField: '_id',
    foreignField: 'company',
    justOne: false,
})

UserSchema.virtual('compnayInternships', {
    ref: 'Internship',
    localField: '_id',
    foreignField: 'company',
    justOne: false,
})

const User = mongoose.model('User', UserSchema)

module.exports = User