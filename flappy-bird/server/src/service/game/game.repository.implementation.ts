import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger';
import { GameModel } from 'models';

import { GameRepository } from './game.repository';

import { technicalErr } from './../../../errors';

@injectable()
export class GameRepositoryImplementation implements GameRepository {
    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async saveGameResults(userId: number, score: number, question: number): Promise<boolean> {
        let isAdd: boolean = false;

        try {
            isAdd = await GameModel.upsert({
                userId,
                score,
                question
            });

            return isAdd;
        } catch {
            const error = technicalErr.gameRepository_Implementation.saveGameResults.msg;

            this.loggerService.errorLog(error);
            throw new Error(error);
        }
    }
}