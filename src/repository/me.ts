import { prisma } from '@/lib/prisma'

export async function getMeRepository(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    omit: {
      id: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return user
}
