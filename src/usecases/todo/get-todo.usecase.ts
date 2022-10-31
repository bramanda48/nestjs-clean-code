import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../domain/common/repository.interface';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel } from '../../domain/model/todo.model';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class GetTodoUseCase implements UseCase<TodoModel> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: IRepository<TodoModel>
    ) { }

    async execute(id: string): Promise<TodoModel> {
        const result = this.todoRepository.getById(id);
        return result;
    }
}