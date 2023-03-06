const Trainer= require('./../models/trainer')
const privateSubscription= require('./../models/privateSupscriptionModel')
const APIfeatures= require('./../utils/apiFeatures')

exports.createTrainer= async(req, res)=>{
    try{
        const trainer= await Trainer.create(req.body)

        res.status(201).json({
            status: 'success',
            trainer
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getAllTrainers= async(req, res)=>{
    try{
        const features= new APIfeatures(Trainer.find(), req.query).filter().sort().limit().paginate()

        const trainers= await features.query

        res.status(200).json({
            status: 'success',
            length: trainers.length,
            trainers
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getOneTrainer= async(req, res)=>{
    try{
        const trainer= await Trainer.findById(req.params.id)
        const private= await privateSubscription.findOne({trainer: trainer._id})
        
        if(!trainer) throw new Error('There is no Trainer with given id')

        res.status(200).json({
            status: 'success',
            trainer,
            private
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

