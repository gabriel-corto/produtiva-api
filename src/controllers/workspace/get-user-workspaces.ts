import { Response } from 'express'

import { prisma } from '@/lib/prisma'
import { AuthRequest } from '@/types/schema'

export async function GetUserWorkspacesController(
  req: AuthRequest,
  res: Response
) {
  const workspaces = await prisma.workspaces.findMany({
    where: {
      userId: req.user.userId,
    },
  })

  return res.status(200).json({
    workspaces,
  })
}
