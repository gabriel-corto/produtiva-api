import { Response } from 'express'
import { AuthRequest } from '@/types/schema'
import { getCurrentWorkspaceRepository } from '@/repository/workspaces'

export async function GetCurrentWorkspaceController(
  req: AuthRequest,
  res: Response
) {
  const workspace = await getCurrentWorkspaceRepository(req.user.userId)

  res.status(200).json({
    ...workspace,
  })
}
