import { Router } from 'express'
import { userController } from '../controllers/userController.js'

const router = Router()

router.get('/', userController.getAll)
router.post('/', userController.create)

export default router