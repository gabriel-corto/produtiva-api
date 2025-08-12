import { prisma } from '@/lib/prisma'
import { SignUpBody } from '@/validators/auth'

export async function findUserByEmail(email: string) {
  return await prisma.users.findUnique({
    where: {
      email,
    },
  })
}

export async function createUser(data: SignUpBody) {
  const user = await prisma.users.create({
    data,
  })

  return user
}
