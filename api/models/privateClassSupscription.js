const mongoose= require('mongoose')
const PrivatePackage= require('./privateClass')
const classSupscriptionSchema= new mongoose.Schema({
    PrivatePackage: {
        type: mongoose.Schema.ObjectId,
        ref: 'PrivateClass'
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: Date,
    class: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    },
    trainee: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

classSupscriptionSchema.pre(/^find/, function(next){
    this.populate({
        path: 'class'
    }).populate('trainee')
    next()
})

classSupscriptionSchema.pre('save', async function(next){
    const package= await PrivatePackage.findById(this.PrivatePackage)
    const duration= package.duration
    const date= new Date()
    date.setMonth(this.startDate.getMonth() + duration)
    this.endDate= date

    next()
})

const PrivateClassSupscription= mongoose.model('PrivateClassSupscription', classSupscriptionSchema)

module.exports= PrivateClassSupscription