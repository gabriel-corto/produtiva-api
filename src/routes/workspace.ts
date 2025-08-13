import { Router } from 'express'
import { CreateWorkspaceController } from '@/controllers/workspace/create-workspace'
import { GetUserWorkspacesController } from '@/controllers/workspace/get-user-workspaces'
import { GetCurrentWorkspaceController } from '@/controllers/workspace/get-current-workspace'

export const workspaceRoutes = Router()

workspaceRoutes.post('/workspaces/new', CreateWorkspaceController)
workspaceRoutes.get('/workspaces/my', GetUserWorkspacesController)
workspaceRoutes.get('/workspaces/current', GetCurrentWorkspaceController)
