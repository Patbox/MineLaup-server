import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

const router = Router()

router.post('/login', AuthController.login)
router.get('/user', AuthController.user)
router.post('/update', AuthController.update)
router.post('/change-password', AuthController.updatePassword)

export default router