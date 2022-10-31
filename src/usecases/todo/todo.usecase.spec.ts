import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoRepositoryMemory } from '../../infrastructure/repositories/memory/todo.repository';
import { AddTodoUseCase } from './add-todo.usecase';
import { DeleteTodoUseCase } from './delete-todo.usecase';
import { GetTodoUseCase } from './get-todo.usecase';
import { GetTodosUseCase } from './get-todos.usecase';

describe('Todo (unit testing)', () => {
    let app: INestApplication;
    let memoryRepo: TodoRepositoryMemory = new TodoRepositoryMemory();
    let addTodoUseCase: AddTodoUseCase;
    let deleteTodoUseCase: DeleteTodoUseCase;
    let getTodoUseCase: GetTodoUseCase;
    let getTodosUseCase: GetTodosUseCase;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AddTodoUseCase,
                    useFactory: () => new AddTodoUseCase(memoryRepo)
                },
                {
                    provide: DeleteTodoUseCase,
                    useFactory: () => new DeleteTodoUseCase(memoryRepo)
                },
                {
                    provide: GetTodoUseCase,
                    useFactory: () => new GetTodoUseCase(memoryRepo)
                },
                {
                    provide: GetTodosUseCase,
                    useFactory: () => new GetTodosUseCase(memoryRepo)
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // Define the usecase
        addTodoUseCase = app.get(AddTodoUseCase);
        deleteTodoUseCase = app.get(DeleteTodoUseCase);
        getTodoUseCase = app.get(GetTodoUseCase);
        getTodosUseCase = app.get(GetTodosUseCase);
    });

    it('should be defined', () => {
        expect(addTodoUseCase).toBeDefined();
        expect(deleteTodoUseCase).toBeDefined();
        expect(getTodoUseCase).toBeDefined();
        expect(getTodosUseCase).toBeDefined();
    });

    it('should create new todo', async () => {
        const createOne = await addTodoUseCase.execute('Title Todo', 'Content Todo');
        const getOne = await getTodoUseCase.execute(createOne.id);
        expect(createOne).toBe(getOne);
    });

    it('must have at least 1 data', async () => {
        const getAll = await getTodosUseCase.execute();
        expect(getAll.length).toBeGreaterThan(0);
    });

    it('should be deleted', async () => {
        let getAll = await getTodosUseCase.execute();
        for (const { id } of getAll) {
            await deleteTodoUseCase.execute(id);
        }

        getAll = await getTodosUseCase.execute();
        expect(getAll.length).toBe(0);
    });
});
