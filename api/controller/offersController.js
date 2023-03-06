const Offer= require('./../models/offres')
const APIfeatures= require('./../utils/apiFeatures')


exports.createOffer= async(req, res)=>{
    try{
        const offer= await Offer.create(req.body)

        res.status(200).json({
            status: 'success',
            offer
        })
    }catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        }
        )
    }
}

exports.getOffers= async(req, res)=>{
    try{
        const features= new APIfeatures(Offer.find(), req.query).filter().sort().limit().paginate()

        const offers= await features.query

        res.status(200).json({
            status: "success",
            length: offers.length,
            data:{
                offers
            }
        })
    }catch(err){

    }
}