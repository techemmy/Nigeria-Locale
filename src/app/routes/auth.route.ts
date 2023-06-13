import express, { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import validatorsMiddleware from '../middlewares/validators.middleware'

const authRouter: Router = express.Router()

authRouter.post(
  '/signup',
  validatorsMiddleware('signup'),
  authController.signup
)
authRouter.post('/login', validatorsMiddleware('login'), authController.login)

export default authRouter
