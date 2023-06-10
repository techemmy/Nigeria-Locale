import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let testDB

export async function connectDB(): Promise<void> {
  testDB = await MongoMemoryServer.create()
  const uri = testDB.getUri()

  await mongoose.connect(uri)
}

export async function cleanUp(): Promise<void> {
  if (testDB) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.deleteMany({})
    }
  }
}

export async function disconnectDB(): Promise<void> {
  if (testDB) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await testDB.stop()
  }
}
