import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  SubTodo,
  Prisma,
} from '@prisma/client';

@Injectable()
export class SubTodoService {
  constructor(private prisma: PrismaService) {}

  async subTodo(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<SubTodo | null> {
    return this.prisma.subTodo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  async subTodos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByInput;
  }): Promise<SubTodo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.subTodo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSubTodo(data: Prisma.SubTodoCreateInput): Promise<SubTodo> {
    return this.prisma.subTodo.create({
      data,
    });
  }

  async updateSubTodo(params: {
    where: Prisma.SubTodoWhereUniqueInput;
    data: Prisma.SubTodoUpdateInput;
  }): Promise<SubTodo> {
    const { data, where } = params;
    return this.prisma.subTodo.update({
      data,
      where,
    });
  }

    async deleteSubTodo(where: Prisma.SubTodoWhereUniqueInput): Promise<SubTodo> {
        return this.prisma.subTodo.delete({
            where,
        });
    }
}