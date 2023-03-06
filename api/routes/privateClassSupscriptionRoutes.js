const express= require('express')
const router= express.Router()

const privateSupscription= require('./../controller/privateClassSupscription')

router.route('/').post(privateSupscription.createPrivate).get(privateSupscription.getAll)

module.exports= router