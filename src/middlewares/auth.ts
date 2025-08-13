import { AuthRequest, TokenPayload } from '@/types/schema'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
    })
  }
}
