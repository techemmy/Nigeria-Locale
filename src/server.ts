import app from './app'
import { MONGO_URI, PORT } from './app/config'
import connectMongoDB from './app/database'

connectMongoDB(MONGO_URI)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
