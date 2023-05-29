import express, { Router } from 'express'
import * as locationController from '../controllers/location.controller'
import passport from 'passport'

const locationAPIRouter: Router = express.Router()

locationAPIRouter.get(
  '/get-new-key',
  passport.authenticate('jwt', { session: false }),
  locationController.getNewAPIKey
)

export default locationAPIRouter
