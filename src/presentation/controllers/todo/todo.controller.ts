import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { UseCaseProxyService } from '../../../usecases/usecase-proxy.service';
import { CreateTodoDto, DeleteTodoDto, GetTodoDto } from './todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
    constructor(private readonly useCase: UseCaseProxyService) {}

    @Get('/')
    async getTodos() {
        return this.useCase.getTodosUsecase.execute();
    }

    @Get('/:id')
    @ApiParam({ name: 'id', description: 'Todo id', type: 'string' })
    async getTodo(@Param() { id }: GetTodoDto) {
        return this.useCase.getTodoUseCase.execute(id);
    }

    @Post('/')
    async createTodo(@Body() { title, content }: CreateTodoDto) {
        return this.useCase.addTodoUseCase.execute(title, content);
    }

    @Delete('/:id')
    @ApiParam({ name: 'id', description: 'Todo id', type: 'string' })
    async deleteTodoById(@Param() { id }: DeleteTodoDto) {
        return this.useCase.deleteTodoUseCase.execute(id);
    }
}
