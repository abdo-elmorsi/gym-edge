const express = require('express')
const router = express.Router()
const userController = require('./../controller/userController')

router.route('/').post(userController.checkValidation)

module.exports = router