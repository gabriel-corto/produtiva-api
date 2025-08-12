import { Request, Response } from 'express'

export async function SignOutController(req: Request, res: Response) {
  res.clearCookie('authToken')

  return res.status(200).json({
    success: true,
    message: 'LOGOUT',
  })
}
