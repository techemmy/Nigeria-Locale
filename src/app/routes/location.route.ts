import express, { Router } from 'express'
import * as locationController from '../controllers/location.controller'
import passport from 'passport'
import confirmAPIKeyMiddleware from '../middlewares/confirmAPIKey.middleware'
import cacheDataMiddleware from '../middlewares/cacheData.middleware'

const locationAPIRouter: Router = express.Router()

locationAPIRouter.get(
  '/get-new-key',
  passport.authenticate('jwt', { session: false }),
  locationController.getNewAPIKey
)

locationAPIRouter.get(
  '/regions',
  confirmAPIKeyMiddleware,
  locationController.getRegions
)

locationAPIRouter.get(
  '/states',
  confirmAPIKeyMiddleware,
  locationController.getStates
)

locationAPIRouter.get(
  '/LGAs',
  confirmAPIKeyMiddleware,
  locationController.getLocalGovernmentArea
)

locationAPIRouter.get(
  '/search',
  confirmAPIKeyMiddleware,
  cacheDataMiddleware,
  locationController.search
)

export default locationAPIRouter
