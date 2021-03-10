import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { resolve } from 'path'
import { UserRepository } from '../repositories/user'
import { SurveyRepository } from '../repositories/survey'
import { SurveyUserRepository } from '../repositories/survey-user'
import SendMailService from '../services/send-email'

export class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body

        const usersRepository = getCustomRepository(UserRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository)

        const user = await usersRepository.findOne({email});

        if (!user) {
            return response.status(400).json({ error: 'User does not exists' })
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            return response.status(400).json({ error: 'Survey does not exists!' })
        }

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{ user_id: user.id}, {value: null }],
            relations: ['user', 'survey']
        })

        if (surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath)

            return response.json(surveyUserAlreadyExists)
        }

        // Save info on surveyUser table
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        // Send e-mail to user
        return response.json(surveyUser)
    }
}
