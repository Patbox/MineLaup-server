import { Router } from 'express'
import isLoggedMiddleware from '../middleware/is-logged.middleware'
import ModpackController from '../controllers/modpack.controller'

const router = Router()

router.post('/create', isLoggedMiddleware, ModpackController.create)
router.get('/list', isLoggedMiddleware, ModpackController.list)
router.get('/', isLoggedMiddleware, ModpackController.get)

export default router
