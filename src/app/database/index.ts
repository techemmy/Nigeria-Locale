import mongoose from 'mongoose'
import * as redis from 'redis'

let redisClient: redis.RedisClientType

export function connectMongoDB(MONGO_URL: string): void {
  mongoose.connect(MONGO_URL)

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!')
  })

  mongoose.connection.on('error', () => {
    console.log("An error occured! Couldn't connect to mongodb")
  })
}

export async function connectRedis() {
  redisClient = redis.createClient()

  redisClient.on('error', (error: Error) => console.log(`Redis: ${error}`))

  await redisClient.connect()
  console.log('Redis connected!')
  return redisClient
}

export { redisClient }
