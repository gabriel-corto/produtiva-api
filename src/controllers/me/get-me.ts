import { prisma } from '@/lib/prisma'
import { getMeRepository } from '@/repository/me'
import { findUserByEmail } from '@/repository/users'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  email: string
  iat: number
  exp: number
  sub: string
}

export async function GetMeController(req: Request, res: Response) {
  const token = req.cookies.authToken

  const { email } = jwt.decode(token) as TokenPayload

  const user = await getMeRepository(email)

  res.status(200).json({
    user,
  })
}
