const express= require('express')
const router= express.Router()
const offerController= require('./../controller/offersController')

router.route('/').post(offerController.createOffer).get(offerController.getOffers)

module.exports= router