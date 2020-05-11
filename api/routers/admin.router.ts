import { Router } from 'express'
import AdminController from '../controllers/admin.controller'
import isAdminMiddleware from '../middleware/is-admin.middleware'

const router = Router()

router.get('/users', isAdminMiddleware, AdminController.users)

export default router
