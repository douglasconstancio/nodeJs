import { Router } from 'express'
import { UserService } from './service/user'

const router = Router()

const userService = new UserService()

router.post('/users', userService.create)

export { router }
