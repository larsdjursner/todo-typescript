import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TodoService } from '../services/todo.service';
  import { Todo as TodoModel } from '@prisma/client';
  
  @Controller()
  export class TodoController {
    constructor(
      private readonly todoService: TodoService,
    ) {}
  
    @Get('todos/:id')
    async getTodoById(@Param('id') id: string): Promise<TodoModel> {
      return this.todoService.todo({ id: Number(id) });
    }
  
    @Get('todos')
    async getTodos(): Promise<TodoModel[]> {
      return this.todoService.todos({
        // where: {userId: Number(userId)}
      });
    }
  
    @Post('todos')
    async createTodo(
      @Body() todoData: { content: string, userId: number },
    ): Promise<TodoModel> {
      const { content, userId } = todoData;
      return this.todoService.createTodo({
        content,
        user: {
          connect: { id: userId},
        },
      });
    }

    @Put('todos/:id')
    async updateTodo(@Param('id') id: string, @Body() todoData: TodoModel): Promise<TodoModel> {
        return this.todoService.updateTodo({
        where: { id: Number(id) },
        data: todoData
      });
    }
  
    @Delete('todos/:id')
    async deleteTodo(@Param('id') id: string): Promise<TodoModel> {
      return this.todoService.deleteTodo({ id: Number(id) });
    }
  
  }