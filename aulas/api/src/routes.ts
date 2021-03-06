import { Router } from 'express'

import { SurveyService } from './service/survey'
import { UserService } from './service/user'

const router = Router()

const userService = new UserService()
const surveyService = new SurveyService()

router.post('/users', userService.create)
router.post('/surveys', surveyService.create)

export { router }
