const mongoose = require('mongoose')

const packageSchema= new mongoose.Schema({
    price: Number,
    duration: Number
})

const Package= mongoose.model('Package', packageSchema)

module.exports= Package