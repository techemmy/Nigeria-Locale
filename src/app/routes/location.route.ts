import express, { Router } from 'express'
import * as locationController from '../controllers/location.controller'
import passport from 'passport'

const locationAPIRouter: Router = express.Router()

export default locationAPIRouter
