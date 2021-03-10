import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveyRepository } from '../repositories/survey'

export class SurveysController {
    async create(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveyRepository)
        const { title, description } = request.body

        const survey = surveysRepository.create({ title, description })

        await surveysRepository.save(survey)

        return response.status(201).json(survey)
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveyRepository)

        const all = await surveysRepository.find()

        return response.json(all)
    }
}
