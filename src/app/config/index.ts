require('dotenv').config()

const PORT: string = process.env.PORT ?? '5000'
const MONGO_URI: string = process.env.MONGO_URI ?? ''
const JWT_Secret: string = process.env.JWT_SECRET ?? ''

export default {
  PORT,
  MONGO_URI,
  JWT_Secret
}
