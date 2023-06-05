import { NextFunction, Request, Response } from 'express'
import { redisClient } from '../database'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category, query } = req.query
  const cachedData: string =
    (await redisClient.get(`${category}-${query}`)) ?? '{}'
  const parsedCache = JSON.parse(cachedData)

  if (category === parsedCache?.category && query === parsedCache?.query) {
    return res.status(200).json({
      success: true,
      message: 'Search Result (Cache)',
      data: parsedCache.data
    })
  }

  next()
}
