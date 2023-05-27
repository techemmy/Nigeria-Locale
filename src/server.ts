import app from './app'
import CONFIG from './app/config'
import connectMongoDB from './app/database'

connectMongoDB(CONFIG.MONGO_URI)

app.listen(CONFIG.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${CONFIG.PORT}`
  )
})
