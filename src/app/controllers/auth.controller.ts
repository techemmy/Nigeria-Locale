import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'
import userModel from '../models/user.model'

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const user: HydratedDocument<IUser> = new User({ username, password })
    const userAPIKey = await user.getAPIKey()
    await user.save()

    const payload = { id: user.id, username: user.username }
    const loginToken = jwt.sign(payload, config.JWT_Secret, { expiresIn: '7d' })

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
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
    const isUserPasswordCorrect = await user?.verifyPassword(password)

    if (!isUserPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        data: {},
        error_code: 401
      })
    }

    const payload = { id: user?.id, username: user?.username }
    const loginToken = jwt.sign(payload, config.JWT_Secret, {
      expiresIn: '7d'
    })
    return res.status(200).json({
      success: true,
      message: 'login succesful',
      data: { loginToken }
    })
  } catch (error) {
    return next(error)
  }
}
