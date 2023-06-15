import morgan, { StreamOptions } from 'morgan'
import logger from '../utils/logger.util'

const stream: StreamOptions = {
  write: (message) => logger.http(message)
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'
  return env !== 'development'
}

const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

export default morganMiddleware
