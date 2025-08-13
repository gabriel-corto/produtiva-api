import { Response } from 'express'

import { createWorkspaceSchema } from '@/validators/workspace'
import { AuthRequest } from '@/types/schema'
import { normalizeString } from '@/utils/normalize-string'
import {
  createWorkspaceRepository,
  getUserWorkspacesRepository,
} from '@/repository/workspaces'

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

  const workspaceName = normalizeString(parsedBody.name)

  const workspaces = await getUserWorkspacesRepository(req.user.userId)

  const workspaceAlreadyExist = workspaces.find(
    (w) => normalizeString(w.name) === workspaceName
  )

  if (workspaceAlreadyExist) {
    return res.status(409).json({
      success: false,
      message: {
        title: 'Worspace Já Cadastrado!',
        description: 'Ja existe um workspace com esse nome!',
      },
    })
  }

  const { name } = await createWorkspaceRepository(
    parsedBody.name,
    req.user.userId
  )

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
