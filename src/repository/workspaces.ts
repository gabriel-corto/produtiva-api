import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'

export async function getUserWorkspacesRepository(userId: number) {
  const workspaces = await prisma.workspaces.findMany({
    where: {
      userId,
    },
    omit: {
      userId: true,
      updatedAt: true,
    },
  })

  return workspaces
}

export async function createWorkspaceRepository(name: string, userId: number) {
  const workspace = await prisma.workspaces.create({
    data: {
      name,
      userId,
      slug: generateSlug(name),
    },
  })

  return workspace
}

export async function getCurrentWorkspaceRepository(userId: number) {
  const existCurrentWorkspace = await prisma.workspaces.findFirst({
    where: {
      userId,
      AND: {
        isDefault: true,
      },
    },
  })

  if (!existCurrentWorkspace) {
    const onlyWorkspace = await prisma.workspaces.findFirst({
      where: {
        userId,
      },
      omit: {
        userId: true,
        updatedAt: true,
      },
    })

    return onlyWorkspace
  }

  return existCurrentWorkspace
}
