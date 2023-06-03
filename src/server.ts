import redis from 'redis'
import app from './app'
import config from './app/config'
import { connectMongoDB, connectRedis } from './app/database'

let redisClient: redis.RedisClientType
connectMongoDB(config.MONGO_URI)

void (async () => {
  redisClient = await connectRedis()
})()

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  )
})

export { redisClient }
