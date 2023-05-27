import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  username: string
  password: string
  email: string
  APIKey: string
  verifyPassword(password: string): boolean
  getAPIKey(): string
  verifyAPIKey(APIKey: string): boolean
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: String,
  APIKey: String
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 15)
})

userSchema.methods.verifyPassword = async function (password: string) {
  const isPassword = await bcrypt.compare(password, this.password)
  return isPassword
}

userSchema.methods.getAPIKey = async function () {
  const APIKey = await bcrypt.hash(this.username, 10)
  this.APIKey = APIKey
  return APIKey
}

userSchema.methods.verifyAPIKey = async function (APIKey: string) {
  return APIKey === this.APIKey
}

export default model<IUser>('User', userSchema)
