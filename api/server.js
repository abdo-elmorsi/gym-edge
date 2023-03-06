const mongoose= require('mongoose')
const dotenv= require('dotenv')
dotenv.config({path: './config.env'})

const app= require("./app");
// "mongodb+srv://dev-abdo:2711@cluster0.09ukawr.mongodb.net/social?retryWrites=true&w=majority"
mongoose.connect("mongodb+srv://dev-abdo:2711@cluster0.zgsnbxy.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    }).then(con => console.log("Connecting to database..."))



// console.log(process.env)
const port= process.env.PORT ||  3001
app.listen(port, ()=> console.log(`Listinning on port ${port}...`))