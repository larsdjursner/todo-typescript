import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
    todo(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<Todo | null>;
    todos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TodoWhereUniqueInput;
        where?: Prisma.TodoWhereInput;
        orderBy?: Prisma.TodoOrderByInput;
    }): Promise<Todo[]>;
    createTodo(data: Prisma.TodoCreateInput): Promise<Todo>;
    updateTodo(params: {
        where: Prisma.TodoWhereUniqueInput;
        data: Prisma.TodoUpdateInput;
    }): Promise<Todo>;
    deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo>;
}
