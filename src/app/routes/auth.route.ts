import express, { Router } from 'express'
import * as authController from '../controllers/auth.controller'

const authRouter: Router = express.Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)

export default authRouter
