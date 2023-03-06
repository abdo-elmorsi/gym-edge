const fs= require('fs')
const morgan= require('morgan')
const rateLimiter= require('express-rate-limit')
const express= require('express')
const cors = require("cors");
const app= express()
const tourRouter= require("./routes/tourRoutes")
const userRouter= require('./routes/userRoutes')
const reviewRouter=require('./routes/reviewRoutes')
const offerRouter= require('./routes/offerRoutes')
const supscriptionRouter= require('./routes/subscriptiosRoutes')
const trainerRouter= require('./routes/trainerRoutes')
const privateSubscriptionRoutes= require('./routes/privateRoutes')
const classRouter= require('./routes/classesRoutes')
const privatePackageRouter= require('./routes/privatePackageRoutes')
const privateClassRouter= require('./routes/privateClassRoutes')
const privateClassSupscription= require('./routes/privateClassSupscriptionRoutes')
const ReceipeRouter= require('./routes/receipeRoutes')
const exercisRouter= require('./routes/exerciseRoutes')
const incomeRouter= require('./routes/incomeRoutes')
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
const limiter= rateLimiter({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many requests from this IP, please try again in an one hour'
})
app.use('/api', limiter)

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next)=>{
    console.log("Hello From The middle ware :)")
    next()
})
app.use((req, res, next)=>{
    req.time= new Date().toISOString()
    // console.log(req.headers)
    next()
})
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.get("/", async (req, res) => {
	res.send("<h1>Welcome Home</h1>");
});

app.get("/api", async (req, res) => {
	res.send("<h1>Welcome Api</h1>");
});

app.use("/api/v1/tours", tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/offers', offerRouter)
app.use('/api/v1/subscribe', supscriptionRouter)
app.use('/api/v1/trainers', trainerRouter)
app.use('/api/v1/privateSubscription', privateSubscriptionRoutes)
app.use('/api/v1/classes', classRouter)
app.use('/api/v1/privatePackage', privatePackageRouter)
app.use('/api/v1/privateClass', privateClassRouter)
app.use('/api/v1/privateClassSupscription', privateClassSupscription)
app.use('/api/v1/receipies', ReceipeRouter)
app.use('/api/v1/exercises', exercisRouter)
app.use('/api/v1/incomes', incomeRouter)


// app.get("/api/v1/tours", getAllTours)
// app.post("/api/v1/tours", createTour)


module.exports= app