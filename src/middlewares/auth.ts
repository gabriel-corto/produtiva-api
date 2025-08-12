import { NextFunction, Request, Response } from 'express'

export async function AuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.cookie

  if (!authToken) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
    })
  }

  next()
}
