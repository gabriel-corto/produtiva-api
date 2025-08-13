import { Router } from 'express'
import { CreateWorkspaceController } from '@/controllers/workspace/create-workspace'
import { GetUserWorkspacesController } from '@/controllers/workspace/get-user-workspaces'

export const workspaceRoutes = Router()

workspaceRoutes.post('/workspace/new', CreateWorkspaceController)
workspaceRoutes.get('/workspaces/my', GetUserWorkspacesController)
