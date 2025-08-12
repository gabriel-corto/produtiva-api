import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export async function authMiddleware(
  req: Request,
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
    jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
    })
  }
}
