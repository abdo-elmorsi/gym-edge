const express= require('express')
const router= express.Router()
const incomeController= require('./../controller/incomeController')
const authController= require('./../controller/authController')

router.route('/').post(authController.protect, authController.restrictTo('admin') ,incomeController.createIncome).get(incomeController.getAll)
router.route('/:id').get(authController.protect,authController.restrictTo('admin') ,incomeController.getOne)

module.exports= router