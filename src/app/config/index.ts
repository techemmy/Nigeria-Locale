const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI ?? ''
const JWT_Secret = process.env.JWT_SECRET

export default {
  PORT,
  MONGO_URI,
  JWT_Secret
}
