const express= require('express')
const router= express.Router()
const privateController= require('./../controller/privateController')

router.route('/').post(privateController.createPrivate).get(privateController.getAll)

module.exports= router