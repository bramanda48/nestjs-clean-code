import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel } from '../../domain/model/todo.model';
import { GeneralRepository } from '../../domain/repositories/general-repository.interface';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class GetTodoUseCase implements UseCase<TodoModel> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: GeneralRepository<TodoModel>,
    ) {}

    async execute(id: string): Promise<TodoModel> {
        const result = this.todoRepository.getById(id);
        return result;
    }
}
