import express, { Express, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import passport from 'passport'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'

import authRouter from './routes/auth.route'
import locationAPIRouter from './routes/location.route'
import passportMiddleware from './middlewares/passport.middleware'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import loggerMiddleware from './middlewares/logger.middleware'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import swaggerDocument from './utils/loadSwaggerDocs.util'

require('dotenv').config()

const app: Express = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(rateLimiterMiddleware)
app.use(loggerMiddleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
passportMiddleware(passport)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Navigate to http://${req.headers.host}/docs for more info`,
    data: {}
  })
})

app.use('/auth', authRouter)
app.use('/api/v1/', locationAPIRouter)

app.use(errorHandlerMiddleware)

export default app
