import { EntityRepository, Repository } from 'typeorm'
import { Survey } from '../models/survey'

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {

}

