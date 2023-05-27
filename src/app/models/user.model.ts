import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { generateAPIKey, verifyAPIKey } from '../utils/APIKey.utils'

export interface IUser {
  username: string
  password: string
  APIkey: string
  getAPIKey(): string
  verifyAPIKey(APIKey: string): string
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  APIkey: String
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 15)
})

userSchema.methods.verifyPassword = async function (password: string) {
  const isPassword = await bcrypt.compare(password, this.password)
  return isPassword
}

userSchema.methods.getAPIKey = async function () {
  const key = await generateAPIKey(this.username)
  this.APIKey = key
  return key
}

userSchema.methods.verifyAPIKey = async function (APIKey: string) {
  return APIKey === this.APIKey
}

export default model<IUser>('User', userSchema)
