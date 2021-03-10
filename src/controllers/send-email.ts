import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/app-error'
import { SurveyRepository } from '../repositories/survey'
import { SurveyUserRepository } from '../repositories/survey-user'
import { UserRepository } from '../repositories/user'
import SendMailService from '../services/send-mail'

export class SendMailController {
    async execute(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository)
        const surveyRepository = getCustomRepository(SurveyRepository)
        const surveyUserRepository = getCustomRepository(SurveyUserRepository)

        const { email, survey_id } = request.body

        const user = await userRepository.findOne({ email })

        if (!user) {
            throw new AppError('User does not exists')
        }

        const survey = await surveyRepository.findOne({ id: survey_id })

        if (!survey) {
            throw new AppError('Survey does not exists!')
        }

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: [ 'user', 'survey' ],
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id
            await SendMailService.execute(email, survey.title, variables, npsPath)

            return response.json(surveyUserAlreadyExists)
        }

        // Save info on surveyUser table
        const surveyUser = surveyUserRepository
            .create({ user_id: user.id, survey_id })

        await surveyUserRepository.save(surveyUser)

        // Send e-mail to user
        variables.id = surveyUser.id

        await SendMailService.execute(email, survey.title, variables, npsPath)

        return response.json(surveyUser)
    }
}
