import { PrismaService } from './prisma.service';
import { SubTodo, Prisma } from '@prisma/client';
export declare class SubTodoService {
    private prisma;
    constructor(prisma: PrismaService);
    subTodo(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<SubTodo | null>;
    subTodos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TodoWhereUniqueInput;
        where?: Prisma.TodoWhereInput;
        orderBy?: Prisma.TodoOrderByInput;
    }): Promise<SubTodo[]>;
    createSubTodo(data: Prisma.SubTodoCreateInput): Promise<SubTodo>;
    updateSubTodo(params: {
        where: Prisma.SubTodoWhereUniqueInput;
        data: Prisma.SubTodoUpdateInput;
    }): Promise<SubTodo>;
    deleteSubTodo(where: Prisma.SubTodoWhereUniqueInput): Promise<SubTodo>;
}
