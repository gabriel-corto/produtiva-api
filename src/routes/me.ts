import { Router } from 'express'
import { GetMeController } from '@/controllers/me/get-me'

export const meRoutes = Router()

meRoutes.get('/me', GetMeController)
