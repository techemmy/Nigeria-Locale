import app from './app'
import config from './app/config'
import connectMongoDB from './app/database'

connectMongoDB(config.MONGO_URI)

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  )
})
