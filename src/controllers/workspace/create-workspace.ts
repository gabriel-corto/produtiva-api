import { Response } from 'express'
import { prisma } from '@/lib/prisma'

import { createWorkspaceSchema } from '@/validators/workspace'
import { AuthRequest } from '@/types/schema'

export async function CreateWorkspaceController(
  req: AuthRequest,
  res: Response
) {
  const body = req.body
  const parsedBody = createWorkspaceSchema.parse(body)

  if (!parsedBody) {
    return res.status(400).json({
      sucess: false,
      message: 'Erro de validação!',
    })
  }

  const { name } = await prisma.workspaces.create({
    data: {
      name: parsedBody.name,
      userId: req.user.userId,
    },
  })

  return res.status(201).json({
    success: true,
    workspace: {
      name,
    },
    message: {
      title: 'Worspace Criado com sucesso!',
    },
  })
}
