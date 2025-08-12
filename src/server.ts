import express, { Response } from 'express'
import z from 'zod'

import cors from 'cors'
import cookieParser from 'cookie-parser'

import { meRoutes } from './routes/me'
import { authRoutes } from './routes/auth'
import { authMiddleware } from './middlewares/auth'

const app = express()
const PORT = process.env.PORT

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  })
)
app.use(cookieParser())
app.use(express.json())

app.use(authRoutes)
app.use(authMiddleware, meRoutes)

app.use((err, req, res: Response, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação!',
      errors: err.issues.map((issue) => issue.message),
    })
  }

  res.status(500).json({
    success: false,
    message: {
      title: 'Erro interno do servidor!',
      description: 'Ocorreu um ero inesperado, tente novamente',
    },
  })
})

app.listen(PORT, () => console.log(`🔥 HTTP Server is running!`))
