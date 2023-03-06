const Class= require('./../models/classesModel')
const APIfeatures= require('./../utils/apiFeatures')

exports.getAllclasses= async(req, res)=>{
    try{
        const features= new APIfeatures(Class.find(), req.query).filter().sort().limit().paginate()
        const classes = await features.query

        res.status(200).json({
            status: 'success',
            length: classes.length,
            classes
        })

    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.createClass= async(req, res)=>{
    try{
        const newClass = await Class.create(req.body)

        res.status(201).json({
            status: 'success',
            class: newClass
        })

    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}
