import express from 'express'
import {PORT,MONGO_URL} from './config/config.mjs'
import mongoose from 'mongoose'
import userRouter from './routes/User.route.mjs'
import authRouter from './routes/Auth.route.mjs'

const app=express()
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

mongoose.connect(MONGO_URL)
.then(()=>console.log("Database connected successfully"))
.catch(error=>console.log(`Error:${error.msg}`))


app.listen(PORT,()=>
{
    console.log(`Server is listening on port ${PORT}`);
    
})