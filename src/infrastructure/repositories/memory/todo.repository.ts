import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { TodoModel } from '../../../domain/model/todo.model';
import { GeneralRepository } from '../../../domain/repositories/general-repository.interface';

@Injectable()
export class TodoRepositoryMemory extends GeneralRepository<TodoModel> {
    private temporaryData: TodoModel[] = [];
    constructor() {
        super();
    }

    async create(data: TodoModel): Promise<TodoModel> {
        data.id = v4();
        data.dateCreated = new Date();
        this.temporaryData.push(data);
        return data;
    }

    async update(id: string, data: TodoModel): Promise<TodoModel> {
        let getOneData = this.temporaryData.find((x) => x.id === id);
        const indexNumber = this.temporaryData.indexOf(getOneData);
        getOneData = { ...getOneData, ...data };
        this.temporaryData[indexNumber] = getOneData;
        return getOneData;
    }

    async getById(id: string): Promise<TodoModel> {
        const getOneData = this.temporaryData.find((x) => x.id === id);
        if (!getOneData) throw new NotFoundException(`Todo doesn't exist`);
        return getOneData;
    }

    async getAll(): Promise<TodoModel[]> {
        return this.temporaryData;
    }

    async getOne(filter: Partial<TodoModel>): Promise<TodoModel> {
        const filterKeys = Object.keys(filter);
        const getFilteredData = this.temporaryData.find((x) => {
            return filterKeys.every((key) => filter[key] == x[key]);
        });
        return getFilteredData;
    }

    async delete(id: string): Promise<void> {
        const findData = this.temporaryData.filter((x) => x.id != id);
        this.temporaryData = findData;
    }
}
