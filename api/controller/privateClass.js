const PrivateClass= require('./../models/privateClass')

exports.createPckage= async (req, res)=>{
    try{
        const package= await PrivateClass.create(req.body)

        res.status(201).json({
            status: 'success',
            package
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getPackage= async (req, res)=>{
    try{
        const packages= await PrivateClass.find()

        res.status(200).json({
            status: 'success',
            packages
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}