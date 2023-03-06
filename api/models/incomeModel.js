const mongoose= require('mongoose')

const incomeSchema= new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    reason: String,
    price: Number
})

incomeSchema.pre(/^find/, function(next){
    this.select('-__v')
    next()
})

const Income= mongoose.model('Income', incomeSchema)

module.exports= Income