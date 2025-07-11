import express from 'express'

const router=express.Router()

router.get('/dashboard',(req,res)=>
{
    res.send("Auth router works")
    
})

router.get('/profile',(req,res)=>
{
    res.send("Auth router works")
    
})

export default router
