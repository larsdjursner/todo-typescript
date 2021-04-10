import { TodoService } from '../services/todo.service';
import { Todo as TodoModel } from '@prisma/client';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getTodoById(id: string): Promise<TodoModel>;
    getTodos(): Promise<TodoModel[]>;
    createTodo(todoData: {
        content: string;
        userId: number;
    }): Promise<TodoModel>;
    updateTodo(id: string, todoData: {
        completed: boolean;
    }): Promise<TodoModel>;
    deleteTodo(id: string): Promise<TodoModel>;
}
