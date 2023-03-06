const express= require('express')
const router= express.Router()

const classController= require('./../controller/classController')

router.route('/').post(classController.createClass).get(classController.getAllclasses)

module.exports= router