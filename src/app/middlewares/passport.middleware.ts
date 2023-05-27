import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import userModel, { IUser } from '../models/user.model'

export default function (passport: PassportStatic) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      (payload, done) => {
        console.log('Payload:', payload)
        userModel.findOne({ id: payload.sub }, (err: Error, user: IUser) => {
          if (err) {
            return done(err, false)
          }

          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      }
    )
  )
}
