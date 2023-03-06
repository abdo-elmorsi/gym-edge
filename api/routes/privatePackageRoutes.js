const express= require('express')
const router= express.Router()
const privatePackageController= require('./../controller/privatePackageController')

router.route('/').post(privatePackageController.createpackage).get(privatePackageController.getAll)

module.exports= router