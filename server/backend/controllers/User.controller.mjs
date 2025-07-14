import User from '../models/User.model.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.mjs'
import { validationResult } from 'express-validator'

export const Me=async (req,res)=>
{
    try
    {
        const user=await User.findById(req.user.userid).select('-password')

        if(!user) {return res.status(404).json({message:"User not found"})}

        return res.status(200).json(user)
    }
    catch(error)
    {
        res.json(null)
    }
    
}


export const Register=async(req,res)=>
{
    //Grabbing the details entered by the user.

    const {name,email,password}=req.body

    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.mapped()
})
    }
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
}


export const Login=async (req,res)=>
{
    //Grabbing the credentials entered by the user
    const {email,password}=req.body

    
    
    const errors=validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(400).json({
        message: "Validation failed",
        errors: errors.mapped()
})
    }

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
    
}

export const Logout=(req,res)=>
{
    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error: error.message })
    }
}