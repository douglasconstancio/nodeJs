import { Router } from 'express'

import { SurveyService } from './services/survey'
import { UserService } from './services/user'

const router = Router()

const userService = new UserService()
const surveyService = new SurveyService()


router.post('/users', userService.create)
router.post('/surveys', surveyService.create)

router.get('/surveys', surveyService.show)

export { router }
