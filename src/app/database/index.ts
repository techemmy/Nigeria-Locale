import mongoose from 'mongoose'

export default function connectMongoDB(MONGO_URL: string): void {
  mongoose.connect(MONGO_URL)

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected!')
  })

  mongoose.connection.on('error', () => {
    console.log("An error occured! Couldn't connect to mongodb")
  })
}
