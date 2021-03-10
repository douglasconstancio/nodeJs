import { Router } from 'express'
import { AnswerController } from './controllers/answer'
import { NpsController } from './controllers/nps'
import { SendMailController } from './controllers/send-email'
import { SurveysController } from './controllers/survey'
import { UserController } from './controllers/user'

const router = Router()

const userController = new UserController()
const surveysController = new SurveysController()

const sendMailController = new SendMailController()

const answerController = new AnswerController()

const npsController = new NpsController()

router.post('/users', userController.create)

router.post('/surveys', surveysController.create)
router.get('/surveys', surveysController.show)

router.post('/sendMail', sendMailController.execute)

router.get('/answers/:value', answerController.execute)

router.get('/nps/:survey_id', npsController.execute)

export { router }
