const mongoose= require('mongoose')

const exerciseSchema= new mongoose.Schema({
     name: String,
     steps: [String],
     img: String,
     video: String,
     type: String
})

const Exercise= mongoose.model('Exercise', exerciseSchema)

module.exports= Exercise