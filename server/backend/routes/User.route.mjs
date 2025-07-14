import express from 'express'
import {Login, Logout, Me, Register} from '../controllers/User.controller.mjs'
import {protect} from '../middleware/protect.mjs'
const router=express.Router()

router.get('/me',protect,Me)

router.post('/register',Register)

router.post('/login',Login)

router.post('/logout',Logout)

export default router
