import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel, TodoModelDeleted } from '../../domain/model/todo.model';
import { GeneralRepository } from '../../domain/repositories/general-repository.interface';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class DeleteTodoUseCase implements UseCase<TodoModelDeleted> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: GeneralRepository<TodoModel>
    ) { }

    async execute(id: string): Promise<TodoModelDeleted> {
        this.todoRepository.delete(id);
        return { 'deleted': true };
    }
}