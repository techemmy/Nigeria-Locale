const PORT: string = process.env.PORT ?? '5000'
const MONGO_URI: string = process.env.MONGO_URI ?? ''

export default {
  PORT,
  MONGO_URI
}
