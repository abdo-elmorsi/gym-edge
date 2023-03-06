
const Tour= require('./../models/tourModel')
const APIfeatures= require('./../utils/apiFeatures')
exports.aliasTopTours= (req, res, next)=>{
    req.query.sort='-ratingsAverage,price'
    req.query.limit=5
    req.query.fields='name,price,ratingsAverage,difficulty,summary'
    next()
}



exports. getAllTours= async (req, res)=>{
    
    try{
       
        const features= new APIfeatures(Tour.find(), req.query).filter().sort().limit().paginate()

        const tours= await features.query
        // const tours= await Tour.find()
        // .where('duration')
        // .equals(5)
        // .where('difficulty')
        // .equals('easy')

        res.status(200).json({
            status: 'success',
            time: req.time,
            results: tours.length,
            data: {
                tours
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}
exports.createTour= async (req, res)=>{
    try{
        const newTour= await Tour.create(req.body)
        res.status(200).json({
            status: "success",
            data:{
                tour: newTour
            }
        })

    }catch(err){
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}
exports.getTour= async(req, res)=>{
    try{
        const tour= await Tour.findById(req.params.id).populate('reviews')
        res.status(200).json(tour)
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}
exports.updateTour= async (req, res)=>{
    try{
        const tour= await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data:{
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.deleteTour= async (req, res)=>{
    try{
        const tour= await Tour.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            data:{
                tour
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }

}

exports.getStatistics= async (req, res)=>{
    try{
        const statistics= await Tour.aggregate([
            {
                $match: {ratingsAverage: {$gte: 4.5}}
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: {$sum: 1},
                    numRatings: {$sum: '$ratingsQuantity'},
                    avgRating: {$avg: '$ratingsAverage'},
                    avgPrice: {$avg: '$price'},
                    minPrice: {$min: '$price'},
                    maxPrice: {$max: '$price'}
                }
            },
            {
                $sort: {numTours: 1}
            },
            // {
            //     $match: {_id: {$ne: 'easy'}}
            // }
        ])

        res.status(200).json({
            status: "success",
            data:{
                statistics
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err.message
        })
    }
}