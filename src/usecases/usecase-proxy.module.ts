import { Global, Module } from '@nestjs/common';
import { AddTodoUseCase } from './todo/add-todo.usecase';
import { DeleteTodoUseCase } from './todo/delete-todo.usecase';
import { GetTodoUseCase } from './todo/get-todo.usecase';
import { GetTodosUseCase } from './todo/get-todos.usecase';
import { UseCaseProxyService } from './usecase-proxy.service';

@Global()
@Module({
    controllers: [],
    providers: [
        UseCaseProxyService,
        AddTodoUseCase,
        DeleteTodoUseCase,
        GetTodoUseCase,
        GetTodosUseCase,
    ],
    exports: [
        UseCaseProxyService,
    ]
})
export class UseCaseProxyModule { }