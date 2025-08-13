import { Response } from 'express'

import { AuthRequest } from '@/types/schema'
import { getUserWorkspacesRepository } from '@/repository/workspaces'

export async function GetUserWorkspacesController(
  req: AuthRequest,
  res: Response
) {
  const workspaces = await getUserWorkspacesRepository(req.user.userId)

  return res.status(200).json(workspaces)
}
