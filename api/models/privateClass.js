const mongoose= require('mongoose')

const privateClassSchema= new mongoose.Schema({
    price: Number,
    duration: Number
})

const PrivateClass= mongoose.model('privateClass', privateClassSchema)

module.exports= PrivateClass