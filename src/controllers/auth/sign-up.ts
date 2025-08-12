import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { signUpSchema } from '@/validators/auth'
import { createUser, findUserByEmail } from '@/repository/users'

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

  await createUser({ name, email, password: password_hash })

  return res.status(201).json({
    success: true,
    message: {
      title: 'Conta criada com sucesso!',
    },
  })
}
