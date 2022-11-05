import { Injectable } from '@nestjs/common';
import { AddTodoUseCase } from './todo/add-todo.usecase';
import { DeleteTodoUseCase } from './todo/delete-todo.usecase';
import { GetTodoUseCase } from './todo/get-todo.usecase';
import { GetTodosUseCase } from './todo/get-todos.usecase';

@Injectable()
export class UseCaseProxyService {
    constructor(
        public readonly addTodoUseCase: AddTodoUseCase,
        public readonly deleteTodoUseCase: DeleteTodoUseCase,
        public readonly getTodoUseCase: GetTodoUseCase,
        public readonly getTodosUsecase: GetTodosUseCase,
    ) {}
}
