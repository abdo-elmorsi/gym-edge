const express = require('express')
const router = express.Router({ mergeParams: true })
const supscriptionController = require('./../controller/userSubscription')

router.route('/').post(supscriptionController.createSupscription).get(supscriptionController.getAllSubscription)
router.route('/:id').get(supscriptionController.getSubscription)
module.exports = router