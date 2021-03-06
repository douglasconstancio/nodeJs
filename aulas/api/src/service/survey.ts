import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { SurveysRepository } from '../repositories/survey'

export class SurveyService {
    async create(request: Request, response: Response) {
        const { title, description } = request.body
        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = surveysRepository.create({
            title, description,
        })

        await surveysRepository.save(survey)

        return response.status(201).json(survey)
    }
}
