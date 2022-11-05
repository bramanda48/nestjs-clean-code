import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMapper } from '../../../domain/common/mapper.interface';
import { TodoModel } from '../../../domain/model/todo.model';
import { GeneralRepository } from '../../../domain/repositories/general-repository.interface';
import { TodoEntity } from '../../entities/todo.entity';

@Injectable()
export class TodoRepository
    extends GeneralRepository<TodoModel>
    implements IMapper<TodoEntity, TodoModel>
{
    constructor(
        @InjectRepository(TodoEntity)
        private readonly repo: Repository<TodoEntity>,
    ) {
        super();
    }

    async create(data: TodoModel): Promise<TodoModel> {
        const newRecord = this.toEntity(data);
        const result = await this.repo.save(newRecord);
        return this.toModel(result);
    }

    async update(id: string, data: TodoModel): Promise<TodoModel> {
        const newRecord = this.toEntity(data);
        const getOneData = await this.repo.findOneBy({ id });
        await this.repo.save({ getOneData, ...newRecord });
        return this.toModel(getOneData);
    }

    async delete(id: string): Promise<void> {
        await this.repo.softDelete(id);
    }

    async getById(id: string): Promise<TodoModel> {
        const getOneData = await this.repo.findOneBy({ id });
        if (!getOneData) throw new NotFoundException(`Todo doesn't exist`);
        return this.toModel(getOneData);
    }

    async getAll(): Promise<TodoModel[]> {
        const getAllData = await this.repo.find();
        return getAllData.map((x) => this.toModel(x));
    }

    async getOne(filter: Partial<TodoModel>): Promise<TodoModel> {
        const getOneData = await this.repo.findOneBy(filter);
        return this.toModel(getOneData);
    }

    toEntity(model: TodoModel): TodoEntity {
        const newObj = new TodoEntity();
        newObj.id = model.id;
        newObj.title = model.title;
        newObj.content = model.content;
        newObj.dateCreated = model.dateCreated;
        newObj.dateUpdated = model.dateUpdated;
        newObj.dateDeleted = model.dateDeleted;
        return newObj;
    }

    toModel(entity: TodoEntity): TodoModel {
        const newObj = new TodoModel();
        newObj.id = entity.id;
        newObj.title = entity.title;
        newObj.content = entity.content;
        newObj.dateCreated = entity.dateCreated;
        newObj.dateUpdated = entity.dateUpdated;
        newObj.dateDeleted = entity.dateDeleted;
        return newObj;
    }
}
