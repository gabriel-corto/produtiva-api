import { Router } from 'express'

import { SignUpController } from '@/controllers/auth/sign-up'
import { SignInController } from '@/controllers/auth/sign-in'
import { SignOutController } from '@/controllers/auth/sign-out'

export const authRoutes = Router()

authRoutes.post('/auth/sign-up', SignUpController)
authRoutes.post('/auth/sign-in', SignInController)
authRoutes.post('/auth/sign-out', SignOutController)
