import { Inject, Injectable } from '@nestjs/common';
import { IRepository } from '../../domain/common/repository.interface';
import { UseCase } from '../../domain/common/usecase.interface';
import { TodoModel, TodoModelDeleted } from '../../domain/model/todo.model';
import { TodoRepository } from '../../infrastructure/repositories/typeorm/todo.repository';

@Injectable()
export class DeleteTodoUseCase implements UseCase<TodoModelDeleted> {
    constructor(
        @Inject(TodoRepository)
        private readonly todoRepository: IRepository<TodoModel>
    ) { }

    async execute(id: string): Promise<TodoModelDeleted> {
        this.todoRepository.delete(id);
        return { 'deleted': true };
    }
}