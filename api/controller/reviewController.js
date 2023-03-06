const Review= require('./../models/reviewModel')
const APIfeatures= require('./../utils/apiFeatures')

exports.getAllReviews= async (req, res)=>{
    try{
        let filter={}
        if(req.params.tourId) filter={tour: req.params.tourId}
        const features= new APIfeatures(Review.find(filter), req.query).filter().sort().limit().paginate()

        const reviews= await features.query

        res.status(200).json({
            status: 'success',
            length: reviews.length,
            data: {
                reviews
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.createReview= async(req, res)=>{
    try{
        // Allow nested routes
        if(!req.body.tour) req.body.tour= req.params.tourId
        if(!req.body.user) req.body.user= req.user._id
        const review= await Review.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                review
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.deleteReview= async (req, res)=>{
    try{
        const review= await Review.findByIdAndDelete(req.params.id)
        if(!review) throw new Error('This review not found with given id')
       
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.updateReview= async (req, res)=>{
    try{
        const review= await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data:{
                review
            }
        })
    }catch(err){
        res.status(404).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getReview= async(req, res)=>{
    try{
        const review= await Review.findById(req.params.id)
        if(!review) throw new Error('there is no review with given id')
        res.status(200).json({
            status: 'success',
            review
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}