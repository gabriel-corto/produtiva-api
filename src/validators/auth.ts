import * as z from 'zod'

const emailRegex =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i

export const signInSchema = z.object({
  email: z.email({
    message: 'Endereço de email inválido',
    pattern: emailRegex,
  }),
  password: z
    .string({ message: 'A senha é obrigatória' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export type SignInBody = z.output<typeof signInSchema>

export const signUpSchema = z.object({
  name: z
    .string({ message: 'O nome é obrigatório' })
    .min(2, 'O nome é obrigatório'),
  email: z.email({
    message: 'Endereço de email inválido',
    pattern: emailRegex,
  }),
  password: z
    .string({ message: 'A senha é obrigatória' })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
    avatarUrl: z.string().optional().nullable()
})

export type SignUpBody = z.output<typeof signUpSchema>
