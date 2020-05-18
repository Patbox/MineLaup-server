import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import isLoggedMiddleware from '../middleware/is-logged.middleware'

const router = Router()

router.post('/login', AuthController.login)
router.get('/user', isLoggedMiddleware, AuthController.user)
router.post('/update', isLoggedMiddleware, AuthController.update)
router.post(
  '/change-password',
  isLoggedMiddleware,
  AuthController.updatePassword
)

export default router
