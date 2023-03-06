const Package= require('./../models/privatePackage')

exports.createpackage= async(req, res)=>{
    try{
        const package= await Package.create(req.body)
        
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

exports.getAll= async(req, res)=>{
    try{
        const packages= await Package.find()

        res.status(200).json({
            status: 'success',
            length: packages.length,
            packages
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}