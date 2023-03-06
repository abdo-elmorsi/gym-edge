const express= require('express')
const router= express.Router()
const exerciseController= require('./../controller/exerciseController')

router.route('/').post(exerciseController.uploadExercisePhoto ,exerciseController.createExercise).get(exerciseController.getAll)
router.route('/:id').get(exerciseController.getOne)

module.exports= router