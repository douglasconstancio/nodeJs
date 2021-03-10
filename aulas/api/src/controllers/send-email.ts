import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { UserRepository } from '../repositories/user'
import { SurveyRepository } from '../repositories/survey'
import { SurveyUserRepository } from '../repositories/survey-user'

export class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const userAlreadyExists = await usersRepository.findOne({ email })

        if (!userAlreadyExists) {
            return response.status(400).json({ error: 'User does not exists' })
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })

        if (!surveyAlreadyExists) {
            return response.status(400).json({ error: 'Survey does not exists!' })
        }

        // Save info on surveyUser table
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        // Send e-mail to user
        return response.json(surveyUser)
    }
}
