const express= require('express')
const router= express.Router()
const PrivateClass= require('./../controller/privateClass')
router.route('/').post(PrivateClass.createPckage).get(PrivateClass.getPackage)
module.exports= router