const Private= require('./../models/privateClassSupscription')

exports.createPrivate= async (req, res)=>{
    try{
        if(!req.body.class) req.body.class= req.params.id
        if(!req.body.trainee) req.body.trainee= req.user._id

        const privateSubscription= await Private.create(req.body)

        res.status(201).json({
            status: 'success',
            privateSubscription
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getAll= async (req, res)=>{
    try{

        const subscriptions= await Private.find()

        res.status(200).json({
            status: 'success',
            length: subscriptions.length,
            subscriptions
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}