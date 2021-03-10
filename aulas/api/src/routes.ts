import { Router } from 'express'

import { SendMailService } from './services/send-email'
import { SurveyService } from './services/survey'
import { UserService } from './services/user'

const router = Router()

const userService = new UserService()
const surveyService = new SurveyService
const sendMailService = new SendMailService

router.post('/users', userService.create)

router.post('/surveys', surveyService.create)
router.get('/surveys', surveyService.show)

router.post('/sendMail', sendMailService.execute)

export { router }
