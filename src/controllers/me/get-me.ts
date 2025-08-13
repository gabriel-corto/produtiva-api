import { getMeRepository } from '@/repository/me'
import { AuthRequest } from '@/types/schema'
import { Response } from 'express'

export async function GetMeController(req: AuthRequest, res: Response) {
  const { email } = req.user

  const user = await getMeRepository(email)

  res.status(200).json({
    ...user,
  })
}
