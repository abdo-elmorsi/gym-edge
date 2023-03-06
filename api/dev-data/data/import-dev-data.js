const fs= require('fs')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
dotenv.config({path: './config.env'})
const Tour= require('./../../models/tourModel')

mongoose.connect(process.env.DATABASE_LOCAL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    }).then(con => console.log("Connecting to database..."))
    
const tours= JSON.parse( fs.readFileSync(`${__dirname}/tours.json`, 'utf-8') )

const importData= async()=>{
    try{
        await Tour.create(tours)
        console.log("data successfully loaded")
        process.exit()
    }catch(err){
        console.log(err.message)
    }
}

const deleteData= async()=>{
    try{
        await Tour.deleteMany()
        console.log("data deleted successfully")
        process.exit()
    }catch(err){
        console.log(err.message)
    }
}

if(process.argv[2] === "--import")
{
    importData()
}else if(process.argv[2] === "--delete"){
    deleteData()
}


console.log(process.argv)

