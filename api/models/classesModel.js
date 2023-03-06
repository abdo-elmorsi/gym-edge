const mongoose= require('mongoose')

const classSchema= new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A class title is required']
    },
    image: {
        type: String,
        required: [true, 'A class image is required']
    },
    newPageId: String,
    summary: String
})

const Class= mongoose.model('Class', classSchema)
module.exports= Class