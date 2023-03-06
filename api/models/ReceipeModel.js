const mongoose= require('mongoose')

const receipeSchema= new mongoose.Schema({
    name: String,
    ingredients: [String],
    steps: [String],
    nutration: [String],
    img: String
})

const Receipe= mongoose.model('Receipe', receipeSchema)

module.exports= Receipe