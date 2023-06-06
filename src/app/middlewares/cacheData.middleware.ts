import { NextFunction, Request, Response } from 'express'
import { redisClient } from '../database'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category, query } = req.query
  const cachedData: string | null = await redisClient.get(
    `${category}-${query}`
  )

  if (!cachedData) {
    return next()
  }

  const parsedCache = JSON.parse(cachedData)
  console.log(parsedCache, await redisClient.get(`${category}-${query}`))
  if (category === parsedCache?.category && query === parsedCache?.query) {
    return res.status(200).json({
      success: true,
      message: 'Search Result (Cache)',
      data: parsedCache.data
    })
  }

  next()
}
