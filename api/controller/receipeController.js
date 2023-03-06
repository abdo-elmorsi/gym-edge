const Receipe= require('./../models/ReceipeModel')
const APIfeatures= require('./../utils/apiFeatures')
const multer= require('multer')

const multerStorage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/img/receipes')
    },
    filename: (req, file, cb)=>{
        const ext= file.mimetype.split('/')[1]
        cb(null,`receipe-${Date.now()}.${ext}`)
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

exports.uploadReceipePhoto= upload.single('img')


exports.createReceipe= async (req, res)=>{
    try{
        req.body.img= req.file.filename
        const receipe= await Receipe.create(req.body)

        res.status(201).json({
            status: 'success',
            receipe
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
        const features= new APIfeatures(Receipe.find(), req.query).filter().sort().limit().paginate()

        const receipies= await features.query
        res.status(200).json({
            status: 'success',
            length: receipies.length,
            receipies
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
        const receipe= await Receipe.findById(req.params.id)
        if(!receipe) throw new Error('There is no receipe with given id')
        res.status(200).json({
            status: 'success',
            receipe
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}