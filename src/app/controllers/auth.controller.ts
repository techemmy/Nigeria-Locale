import { Request, Response } from 'express'

export function signup(req: Request, res: Response): Response {
  return res.json({ message: 'signup successful' })
}

export function login(req: Request, res: Response): Response {
  return res.json({ message: 'login succesful' })
}
