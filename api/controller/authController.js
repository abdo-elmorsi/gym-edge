const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const User = require('./../models/userModel')
const sendEmail = require('./../utils/email')
const signtoken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `user-${Date.now()}.${ext}`)
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Please Upload only image'), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo')

exports.signup = async (req, res) => {
    try {
        console.log(req.file);
        let photo
        if (req.file) {
            photo = req.file.filename
        } else {
            photo = 'default.jpg'
        }
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt,
            role: req.body.role,
            photo
        })
        newUser.password = undefined
        const token = signtoken(newUser._id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

        res.cookie('jwt', token, cookieOptions)

        res.status(201).json({
            status: 'success',
            token,
            user: newUser
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        // 1) check if the email and password exist
        if (!email || !password) {
            throw new Error("Please provide email and password")
        }
        // 2) check if user exist and password correct
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "invalid eamil or password"
            })
        }
        const correct = await user.correctPassword(password, user.password)

        if (!correct) {
            return res.status(401).json({
                status: "Failed",
                message: "invalid eamil or password"
            })
        }
        const token = signtoken(user._id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({
            status: "success",
            token,
            user
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token
        // 1) Getting Token and check if it is there
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) throw new Error('you are not logged in! please login to get access')
        // 2) verification token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        // 3) check if the user is still exist
        const currenthUser = await User.findById(decoded.id)

        if (!currenthUser) throw new Error('The user belonging to this token does no longer exist')

        // 4) check if user changed password after token was issued
        if (currenthUser.changedPasswordAfter(decoded.iat)) throw new Error('User recently changed password, please login again')

        req.user = currenthUser
        next()
    } catch (err) {
        res.status(401).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                throw new Error('you do not have a permission to do this action')
            }
            next()
        } catch (err) {
            res.status(403).json({
                status: "Failed",
                message: err.message
            })
        }
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        // 1) get the user with given email
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                status: 'faild',
                message: 'this user is not found with the given email'
            })
        }

        // 2) Generate the random rest token
        const resetToken = user.createPasswordResetToken()
        await user.save({ validateBeforeSave: false })

        // 3) Send it to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

        const message = `Forgot your password? Submit a PATCH request with your new password 
        to: ${resetURL}. \nIf you didn't forget your password< please ignore this email`

        try {

            await sendEmail({
                email: req.body.email,
                subject: 'your password reset token (valid for 10 minutes)',
                message
            })

            res.status(200).json({
                status: 'success',
                message: 'token sent to email!'
            })
        } catch (err) {
            user.passwordResetToken = undefined
            user.passwordResetExpires = undefined
            await user.save({ validateBeforeSave: false })
            throw new Error('There was an Error sending email, try to send again')
        }

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        // 1) Get the user based on token
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        // 2) If token has not expired, and there is a user, set the new password
        const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })

        if (!user) {
            throw new Error('Token is invalid or expired')
        }
        user.password = req.body.password
        user.passwordConfirm = req.body.passwordConfirm
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        // 3) Update changedPasswordAt property for the user

        // 4) Finnaly login the user, send JWT
        const token = signtoken(user._id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

        res.cookie('jwt', token, cookieOptions)

        res.status(200).json({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('+password')
        const correct = await user.correctPassword(req.body.oldpassword, user.password)
        if (!correct) {
            throw new Error('Your current password is not correct !')
        }
        user.password = req.body.newPassword
        user.passwordConfirm = req.body.newPasswordConfirm
        await user.save()

        const token = signtoken(user._id)
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

        res.cookie('jwt', token, cookieOptions)

        res.status(200).json({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(401).json({
            status: 'failed',
            message: err.message
        })
    }
}
