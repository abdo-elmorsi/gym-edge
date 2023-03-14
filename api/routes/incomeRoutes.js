const express = require('express')
const router = express.Router()
const incomeController = require('./../controller/incomeController')
const authController = require('./../controller/authController')

router.route('/').post(incomeController.createIncome).get(incomeController.getAll)
router.route('/:id').get(incomeController.getOne)

module.exports = router