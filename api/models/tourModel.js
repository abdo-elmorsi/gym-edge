const mongoose= require('mongoose')
// const User= require('./userModel')
const slugify= require('slugify')
const validator= require('validator')
const tourSchema= new mongoose.Schema({
    name: {
        type: String,
        unique : true,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [40, 'A tour name must be less than or equal 40'],
        minlength: [10, 'A tour name must be longer than or equal 10']
        // validate: [validator.isAlpha, 'Tour name must only contain a characters']
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        max: [5, 'A rating must be less than or equal 5'],
        min: [1, 'A rating must be above or eaqual 1']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A price is required'],
        unique: false
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                // this only points to doc on NEW document creation, not work with update
                return val < this.price
            },
            message: 'A price discount ({VALUE}) must be less than the price'
        }
    },
    slug: String,
    summary: {
        type: String,
        trim: true,
        required: [true, ' A tour must have a group summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a group an imageCover']
    },
    images: [String],
    secretTour: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    startLocation: {
        //GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    ],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
})

tourSchema.pre('save', function(next){
    this.slug= slugify(this.name, {lower: true})
    next()
})

// tourSchema.pre('save', async function(next){
//     const guidesPromises= this.guides.map(async id=> await User.findById(id))
//     this.guides= await Promise.all(guidesPromises)
//     next()
// })

tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true}})
    next()
})
tourSchema.pre(/^find/, function(next){
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    })
    next()
})

tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {difficulty: {$ne: 'test'}}})
    next()
})
// tourSchema.post('save', function(doc, next){
//     console.log(doc)
//     next()
// })
const Tour= mongoose.model('Tour', tourSchema)

module.exports= Tour