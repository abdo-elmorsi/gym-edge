const Exercise= require('./../models/exerciseModel')
const APIfeatures= require('./../utils/apiFeatures')
const multer= require('multer')


const multerStorage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/img/exercises')
    },
    filename: (req, file, cb)=>{
        const ext= file.mimetype.split('/')[1]
        cb(null,`exercise-${Date.now()}.${ext}`)
    }
})

const multerFilter= (req, file, cb)=>{
if(file.mimetype.startsWith('image')){
    cb(null, true)
}else{
    cb( new Error('Please Upload only image'),false)
}
}

const upload= multer({
    storage: multerStorage,
    fileFilter: multerFilter
}) 

exports.uploadExercisePhoto= upload.single('video')

exports.createExercise= async (req, res)=>{
    try{
        req.body.video= req.file.filename
        const exercise= await Exercise.create(req.body)

        res.status(201).json({
            status: 'success',
            exercise
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
        const features= new APIfeatures(Exercise.find(), req.query).filter().sort().limit().paginate()
        const exercises= await features.query

        res.status(200).json({
            status: 'success',
            length: exercises.length,
            exercises
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getOne= async(req, res)=>{
    try{
        const exercise= await Exercise.findById(req.params.id)

        if(!exercise) throw new Error('There is no exercis with given id')

        res.status(200).json({
            status: 'success',
            exercise
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

