import { Request } from 'express'

export interface TokenPayload {
  email: string
  userId: number
  iat: number
  exp: number
  sub: string
}

export interface AuthRequest extends Request {
  user?: TokenPayload
}
