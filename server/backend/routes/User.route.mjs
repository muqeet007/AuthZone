import express from 'express'
import {Login, Logout, Me, Register} from '../controllers/User.controller.mjs'
import {protect} from '../middleware/protect.mjs'
import {body,validationResult} from 'express-validator'
const router=express.Router()


const validationRegister=[
    body('name')
    .notEmpty().withMessage("Username can not be empty.")
    .isAlpha().withMessage("Use Alphabetic characters for name"),
    body('email').isEmail().withMessage("Type an appropriate email"),
    body('password').isLength({min:5}).withMessage("Password must be atleast 5 characters long")
    .isAlphanumeric().withMessage("Password must contain numbers and alphabetic characters"),
]

const validationLogin=[
    body('email')
    .notEmpty().withMessage("Email can not be empty.")
    .isEmail().withMessage("Type an appropriate email"),
    body('password')
    .notEmpty().withMessage("Password can not be empty.")
    .isLength({min:5}).withMessage("Password must be atleast 5 characters long")
    .isAlphanumeric().withMessage("Password must contain numbers and alphabetic characters"),
]


router.get('/me',protect,Me)

router.post('/register',validationRegister,Register)

router.post('/login',validationLogin,Login)

router.post('/logout',Logout)

export default router
