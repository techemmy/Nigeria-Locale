require('dotenv').config()

const PORT: string = process.env.PORT ?? '5000'
const MONGO_URI: string = process.env.MONGO_URI ?? ''
const JWT_Secret: string = process.env.JWT_SECRET ?? ''
const REDIS_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.REDIS_DEV_URL ?? ''
    : process.env.REDIS_PRDD_URL ?? ''

export default {
  PORT,
  MONGO_URI,
  JWT_Secret,
  REDIS_URL
}
