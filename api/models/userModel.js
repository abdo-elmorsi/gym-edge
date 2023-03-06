const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
        // maxlength: [40, 'A user name must be less than or equal 40'],
        // minlength: [5, 'A user name must be more than or equal 5']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    photo: { type: String, default: 'default.jpg' },
    role: {
        type: String,
        enum: ['user', 'trainer', 'trainee', 'admin'],
        default: 'user'
    },
    phone: Number,
    password: {
        type: String,
        required: [true, 'please provide your password'],
        minlength: [8, 'password must be more than or equal 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please provide password confirm'],
        minlength: 8,
        validate: {
            //this only work on create and save
            validator: function (val) {
                return val === this.password
            },
            message: 'passsword does not match the confirmed password'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.virtual('subscribe', {
    ref: 'Subscription',
    foreignField: 'user',
    localField: '_id'
})

userSchema.pre('save', async function (next) {
    // only run this middle ware if password modified
    if (!this.isModified('password')) return next()
    // hashing the password
    this.password = await bcrypt.hash(this.password, 12)
    // delete confirm password field
    this.passwordConfirm = undefined

    next()
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000
    next()
})


userSchema.methods.correctPassword = async function (candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass)
}

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)

        return JWTTimeStamp < changedTimestamp
    }
    // False means not changed
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    console.log({ resetToken }, this.passwordResetToken)

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}



const User = mongoose.model("User", userSchema)

module.exports = User