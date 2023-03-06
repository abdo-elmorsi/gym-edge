const mongoose= require('mongoose')
const Offer= require('./../models/offres')
const User= require('./../models/userModel')
const subscriptionSchema= new mongoose.Schema({
    startDate:{
        type: Date,
        default: Date.now()
    },
    endDate: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    offer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Offer'
    }
})

subscriptionSchema.pre(/^find/, function(next){
    this.populate({
        path: 'offer'
    })
    next()
})

subscriptionSchema.pre('save', async function(next){
    let offer = await Offer.find(this.offer)
    offer= await Promise.all(offer)
    const duration= offer[0].duration
    console.log(offer)
    const date= new Date()
    date.setMonth(this.startDate.getMonth() + duration)
    this.endDate= date
    next()
})
subscriptionSchema.pre('save',async function(next){
    const user= await User.findByIdAndUpdate(this.user, {
        role: 'trainee'
    },{
        new: true,
        runValidators: true
    })
    next()
})

const Subscription= mongoose.model('Subscription', subscriptionSchema)

module.exports= Subscription