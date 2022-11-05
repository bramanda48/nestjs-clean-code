import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel } from '../../domain/model/todo.model';
import { GeneralRepository } from '../../domain/repositories/general-repository.interface';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class AddTodoUseCase implements UseCase<TodoModel> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: GeneralRepository<TodoModel>
    ) { }

    async execute(title: string, content: string): Promise<TodoModel> {
        const result = this.todoRepository.create({
            title, content
        });
        return result;
    }
}