import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const user: HydratedDocument<IUser> = new User({ username, password })
    const userAPIKey = await user.getAPIKey()
    // await user.save()

    const payload = { id: user.id, username: user.username }
    const JWToken = jwt.sign(payload, config.JWT_Secret, { expiresIn: '7d' })
    console.log(JWToken)

    return res.status(201).json({
      success: true,
      message: 'signup successful',
      data: {
        userAPIKey,
        Note: `Copy your key and save it. We won't show it to you again`
      }
    })
  } catch (error) {
    return next(error)
  }
}

export function login(req: Request, res: Response) {
  return res.json({ message: 'login succesful' })
}
