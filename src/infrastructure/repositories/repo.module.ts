import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../config/typeorm/typeorm.config';
import { TodoEntity } from '../entities/todo.entity';
import { TodoRepositoryMemory } from './memory/todo.repository';
import { TodoRepository } from './typeorm/todo.repository';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        TypeOrmModule.forFeature([TodoEntity]),
    ],
    controllers: [],
    providers: [
        TodoRepository,
        TodoRepositoryMemory
    ],
    exports: [
        TodoRepository,
        TodoRepositoryMemory
    ],
})
export class RepoModule { }