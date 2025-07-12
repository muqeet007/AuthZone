import express from 'express'
import User from '../models/User.model.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.mjs'
const router=express.Router()

router.get('/me',(req,res)=>
{
    
    
})

router.post('/register',async(req,res)=>
{
    //Grabbing the details entered by the user.

    const {name,email,password}=req.body

    try
    {
        // Trying to see whether the user with the same email already exists , as email is unique
    const user=await User.findOne({email})
    
    if(user)
    {
        return res.status(400).json({
            message:"User already exists."
        })
    }

    else
    {
        //Hashing the password to ensure security.

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({name,email,password:hashedPassword})
        await newUser.save()
        return res.status(201).json({
            message:"User has been created successfully."
        })
    }
    }

    catch(error)
    {
        return res.status(500).json({
            message:`Error:${error.message}`
        })
    }
})

router.post('/login',async (req,res)=>
{
    //Grabbing the credentials entered by the user
    const {email,password}=req.body

    try
    {
        const user=await User.findOne({email})

        if(user)
        {
            // Checking the password

            const isMatch=await bcrypt.compare(password,user.password)

            if (!isMatch) return res.status(400).json({ message: "Invalid credentials." })
            
            else
            {
                // Creating jet token
                const token=jwt.sign(
                {
                    userid:user._id,
                    useremail:user.email
                },
                SECRET_KEY,
                {expiresIn:'2h'})

                res.cookie('token',token,
                    {
                        httpOnly: true,        // Cannot be accessed from JavaScript
                        secure: false,          // Only sent over HTTPS (use false for localhost)
                        sameSite: "Strict",    // CSRF protection
                        maxAge: 2 * 60 * 60 * 1000, // 2 hours
                    }
                )
            

            res.status(200).json({ message: "Login successful" });
            }
        }

        else
        {
            return res.status(400).json(
                {message:"Invalid Credentials"}
            )
        }
    }
    catch(error)
    {
         return res.status(500).json({
            message:`Error:${error.message}`
        })
    }
    
})

router.post('/logout',(req,res)=>
{
    
    
})

export default router
