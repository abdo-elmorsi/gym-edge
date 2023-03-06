const mongoose= require('mongoose')
const validator= require('validator')

const trainerSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A trainer name is required']
    },
    biography: {
        type: String,
        required: [true, 'A trainer biography is required']
    },
    skills: [String],
    experience: String,
    age: Number,
    email:{
        type: String,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    phone: String

})
const Trainer= mongoose.model('Trainer', trainerSchema)

module.exports= Trainer