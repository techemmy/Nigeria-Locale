import { NextFunction, Request, Response } from 'express'
import userModel from '../models/user.model'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader?.includes('Bearer')) {
    return res.status(401).json({
      success: false,
      message:
        'API Key required in the Bearer Authorization! Sign up to get a key',
      data: {},
      error_code: 401
    })
  }

  const APIKey = authHeader.split('Bearer')[1].trim()
  const keyExists = await userModel.findOne({ APIKey })

  if (!keyExists) {
    return res.status(401).json({
      success: false,
      message:
        'Invalid API Key. Have you forgotten your API Key. Regerate another one at `/get-new-key` route',
      data: {},
      error_code: 401
    })
  }

  next()
}
