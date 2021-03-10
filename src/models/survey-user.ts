import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Survey } from './survey'
import { User } from './user'

@Entity('surveys_users')
export class SurveyUser {

    @PrimaryColumn()
    readonly id: string

    @Column()
    user_id: string

    @Column()
    survey_id: string

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    @ManyToOne(() => User)
    @JoinColumn({ name:'user_id' })
    user: User

    @ManyToOne(() =>  Survey)
    @JoinColumn({ name:'survey_id' })
    survey: Survey
}
