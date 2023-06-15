import app from './app'
import config from './app/config'
import { connectMongoDB, connectRedis } from './app/database'
import logger from './app/utils/logger'

connectMongoDB(config.MONGO_URI)

void (async () => {
  await connectRedis()
})()

app.listen(config.PORT, () => {
  logger.info(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  )
})
