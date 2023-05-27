import jwt from 'jsonwebtoken'
import config from './config'

export function generateJWTLoginToken(userId: string, username: string) {
  if (!userId || !username) return

  return jwt.sign({ id: userId, username }, config.JWT_Secret, {
    expiresIn: '7d'
  })
}
