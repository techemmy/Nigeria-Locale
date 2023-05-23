import express, { Express, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nigeriaLocations from 'nigeria-geo'
import authRouter from './routes/auth.route'
require('dotenv').config()

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  const nl = nigeriaLocations.all()
  res.json(nl)
})

app.use('/auth', authRouter)

export default app
