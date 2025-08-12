import express, { Request, Response } from 'express'
import z from 'zod'
import cors from 'cors'

import { authRoutes } from './routes/auth'

const app = express()
const PORT = process.env.PORT

app.use(cors({
  credentials: true,
  origin: process.env.FRONT_END_URL
}))

app.use(express.json())
app.use(authRoutes)


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
    message: 'Erro interno do servidor!',
  })
})

app.listen(PORT, () =>
  console.log(`🔥 Server is running on http://localhost:${PORT}`)
)
