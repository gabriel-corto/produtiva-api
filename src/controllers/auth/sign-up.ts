import { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { signUpSchema } from '@/validators/auth'
import { createUser, findUserByEmail } from '@/repository/users'
import { createWorkspaceRepository } from '@/repository/workspaces'
import { generateWorkspace } from '@/utils/generate-workspace'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export async function SignUpController(req: Request, res: Response) {
  const body = req.body
  const parsedBody = signUpSchema.parse(body)

  if (!parsedBody) {
    return res.status(400).json({
      sucess: false,
      message: 'Erro de validação!',
    })
  }

  const { name, email, password } = parsedBody
  const password_hash = await bcrypt.hash(password, 6)

  const userAlreadyExist = await findUserByEmail(email)

  if (userAlreadyExist) {
    return res.status(409).json({
      success: false,
      message: {
        title: 'Usuário Já Cadastrado!',
        description: 'Ja existe um usuário com esse email.',
      },
    })
  }

  const user = await createUser({ name, email, password: password_hash })
  await createWorkspaceRepository(generateWorkspace(user.name), user.id)

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    JWT_SECRET_KEY,
    {
      subject: user.email,
      expiresIn: '2h',
    }
  )

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 2 * 1000,
  })

  return res.status(201).json({
    success: true,
    message: {
      title: 'Conta criada com sucesso!',
    },
  })
}
