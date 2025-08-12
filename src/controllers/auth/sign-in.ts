import { Request, Response } from 'express'

export async function SignInController(req: Request, res: Response) {
  return res.json({ success: true, message: 'Sign In' })
}
