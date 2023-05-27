import bcrypt from 'bcrypt'

export async function generateAPIKey(username: string) {
  const APIKey = await bcrypt.hash(username, 10)
  return APIKey
}

export async function verifyAPIKey(key: string, realAPIKey: string) {
  const isVerified = await bcrypt.compare(key, realAPIKey)
  return isVerified
}
