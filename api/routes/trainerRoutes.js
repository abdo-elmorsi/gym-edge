const express= require('express')
const router= express.Router()
const TrainerController= require('./../controller/trainerController')

router.route('/').post(TrainerController.createTrainer).get(TrainerController.getAllTrainers)
router.route('/:id').get(TrainerController.getOneTrainer)

module.exports= router