const express= require('express')
const router= express.Router()
const receipeController= require('./../controller/receipeController')

router.route('/').post(receipeController.uploadReceipePhoto ,receipeController.createReceipe).get(receipeController.getAll)
router.route('/:id').get(receipeController.getOne)

module.exports= router