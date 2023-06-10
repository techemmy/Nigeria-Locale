import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let testDB

export async function connectDB() {
  testDB = await MongoMemoryServer.create()
  const uri = testDB.getUri()

  await mongoose.connect(uri)
}

export async function cleanUp() {
  if (testDB) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.deleteMany({})
    }
  }
}

export async function disconnectDB() {
  if (testDB) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await testDB.stop()
  }
}
