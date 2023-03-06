const express= require('express')
const router= express.Router({mergeParams: true})
const supscriptionController= require('./../controller/userSubscription')

router.route('/').post(supscriptionController.createSupscription).get(supscriptionController.getAllSubscription)

module.exports= router