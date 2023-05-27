import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import userModel from '../models/user.model'

export default function (passport: PassportStatic) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        console.log('Payload:', payload)
        const user = await userModel.findOne({ _id: payload.id })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      }
    )
  )
}
