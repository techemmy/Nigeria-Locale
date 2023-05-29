import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'

export async function getNewAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as HydratedDocument<IUser>
    const newAPIKey = await bcrypt.hash(user.username, 10)
    await userModel.findByIdAndUpdate(user.id, { APIKey: newAPIKey })
    return res.status(201).json({
      success: true,
      message: 'New Key Generated!',
      data: {
        APIKey: newAPIKey,
        Note: `Copy your key and save it. We won't show it to you again`
      }
    })
  } catch (error) {
    return next(error)
  }
}
