import express, { Express, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nigeriaLocations, { NigeriaLocation } from 'nigeria-geo'
import passport from 'passport'
import bodyParser from 'body-parser'

import authRouter from './routes/auth.route'
import locationAPIRouter from './routes/location.route'
import passportMiddleware from './middlewares/passport.middleware'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'

require('dotenv').config()

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: true }))
passportMiddleware(passport)

app.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    const nl: NigeriaLocation = nigeriaLocations.all()
    res.json(nl)
  }
)

app.use('/auth', authRouter)
app.use('/api/v1/', locationAPIRouter)

app.use(errorHandlerMiddleware)

export default app
