const userSupscription= require('./../models/userSupscription')

exports.createSupscription= async(req, res)=>{
    try{
        if(!req.body.offer) req.body.offer= req.params.id
        if(!req.body.user)  req.body.user= req.user._id
       
        const supscription= await userSupscription.create(req.body)

        res.status(201).json({
            status: 'success',
            supscription
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.massage
        })
    }
}

exports.getAllSubscription= async(req, res)=>{
    try{
        const subscriptions= await userSupscription.find()
        res.status(200).json({
            status: 'success',
            subscriptions
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.massage
        })
    }
}
