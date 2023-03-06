const mongoose= require('mongoose')

const offerSchema= new mongoose.Schema({
    price: Number,
    duration: Number
})

const Offer= mongoose.model('Offer', offerSchema)

module.exports= Offer