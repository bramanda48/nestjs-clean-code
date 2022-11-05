import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel } from '../../domain/model/todo.model';
import { GeneralRepository } from '../../domain/repositories/general-repository.interface';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class GetTodosUseCase implements UseCase<TodoModel[]> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: GeneralRepository<TodoModel>,
    ) {}

    async execute(): Promise<TodoModel[]> {
        const result = this.todoRepository.getAll();
        return result;
    }
}
