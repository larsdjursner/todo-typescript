import { SubTodoService } from './subtodo.service';
import { SubTodo as SubTodoModel } from '@prisma/client';
export declare class SubTodoController {
    private readonly subTodoService;
    constructor(subTodoService: SubTodoService);
    getSubTodoById(id: string): Promise<SubTodoModel>;
    getSubTodos(): Promise<SubTodoModel[]>;
    createSubTodo(subTodoData: {
        parentId: number;
        content: string;
    }): Promise<SubTodoModel>;
    updateSubTodo(id: string, subTodoData: {
        completed: boolean;
    }): Promise<SubTodoModel>;
    deleteSubTodo(id: string): Promise<SubTodoModel>;
}
