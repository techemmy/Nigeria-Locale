import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import userModel, { IUser } from '../models/user.model'
import { HydratedDocument } from 'mongoose'

export default function (passport: PassportStatic) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        const user: HydratedDocument<IUser> | null = await userModel.findOne({
          _id: payload.id
        })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      }
    )
  )
}
