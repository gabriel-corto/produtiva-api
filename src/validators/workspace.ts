import * as z from 'zod'

export const createWorkspaceSchema = z.object({
  name: z
    .string({ message: 'Nome Obrigatório para Worspace! ' })
    .min(1, 'Nome muito curto para workspace!'),
})

export type CreateWoksSpaceBody = z.infer<typeof createWorkspaceSchema>
