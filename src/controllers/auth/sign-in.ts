import { Request, Response } from 'express'

import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { findUserByEmail } from '@/repository/users'
import { signInSchema } from '@/validators/auth'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export async function SignInController(req: Request, res: Response) {
  const body = req.body
  const parsedBody = signInSchema.parse(body)

  if (!parsedBody) {
    return res.status(400).json({
      sucess: false,
      message: 'Erro de validação!',
    })
  }

  const { email, password } = parsedBody
  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: {
        title: 'Usuário Nao Encontrado!',
        description: 'Nao existe um usuário com esse email!',
      },
    })
  }

  const isValidPassword = await bycrypt.compare(password, user.password)

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      message: {
        title: 'Senha Incorreta!',
        description: 'A senha informada não está correta',
      },
    })
  }

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    JWT_SECRET_KEY,
    {
      subject: user.email,
      expiresIn: '7d',
    }
  )

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  return res.status(200).json({
    success: true,
    code: 'AUTHENTICATED',
  })
}
