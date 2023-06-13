import signupValidator from '../validators/signup.validator'
import loginValidator from '../validators/login.validator'
import { NextFunction, Request, Response } from 'express'

const validators = {
  signup: signupValidator,
  login: loginValidator
}

export default function (validator: string) {
  if (!validators.hasOwnProperty(validator)) {
    throw new Error(`Invalid Validator: "${validator}" does not exist`)
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validators[validator as keyof typeof validators].validateAsync(
        req.body
      )
      next()
    } catch (error) {
      return next(error)
    }
  }
}
