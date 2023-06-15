import jwt from 'jsonwebtoken'
import config from '../config'

export default function generateJWTLoginToken(
  userId: string | undefined,
  username: string | undefined
) {
  if (!userId || !username) return

  return jwt.sign({ id: userId, username }, config.JWT_Secret, {
    expiresIn: '7d'
  })
}
