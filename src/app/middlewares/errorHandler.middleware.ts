import { NextFunction, Request, Response } from 'express'

export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('An error occured:', error.message)
  if (res.headersSent) {
    return next(error)
  }

  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errorCode: 400,
      data: {}
    })
  }

  return res.json(500).json({
    success: false,
    message: error,
    errorCode: 500,
    data: {}
  })
}
