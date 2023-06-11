import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'
import userModel from '../models/user.model'
import { generateJWTLoginToken } from '../utils'
import signupValidator from '../validators/signup.validator'
import loginValidator from '../validators/login.validator'

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    await signupValidator.validateAsync(req.body)

    const isUsernameExists = await userModel.findOne({
      username: req.body.username
    })
    const isEmailExists = await userModel.findOne({ email: req.body.email })

    if (isUsernameExists) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
        data: {},
        errorCode: 400
      })
    }
    if (isEmailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email has been used!',
        data: {},
        errorCode: 400
      })
    }

    const user: HydratedDocument<IUser> = new User(req.body)
    const userAPIKey = await user.getAPIKey()
    await user.save()

    const loginToken = generateJWTLoginToken(user.id, user.username)

    return res.status(201).json({
      success: true,
      message: 'signup successful',
      data: {
        userAPIKey,
        Note: `Copy your key and save it. We won't show it to you again`,
        loginToken
      }
    })
  } catch (error) {
    return next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    await loginValidator.validateAsync(req.body)
    const { username, password } = req.body

    const user: HydratedDocument<IUser> | null = await userModel.findOne({
      username
    })
    const isUserPasswordCorrect = await user?.verifyPassword(password)

    if (!isUserPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        data: {},
        errorCode: 401
      })
    }

    const loginToken = generateJWTLoginToken(user?.id, user?.username)

    return res.status(200).json({
      success: true,
      message: 'login succesful',
      data: { loginToken }
    })
  } catch (error) {
    return next(error)
  }
}
