import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.body)
    const { username, password } = req.body

    const user: HydratedDocument<IUser> = new User({ username, password })
    const userAPIKey = await user.getAPIKey()
    await user.save()

    return res.status(201).json({
      success: true,
      message: 'signup successful',
      data: { userAPIKey }
    })
  } catch (error) {
    return next(error)
  }
}

export function login(req: Request, res: Response) {
  return res.json({ message: 'login succesful' })
}
