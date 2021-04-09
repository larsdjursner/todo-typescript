import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { SubTodoService } from '../services/subtodo.service';
  import { SubTodo as SubTodoModel } from '@prisma/client';
  
  @Controller()
  export class SubTodoController {
    constructor(
      private readonly subTodoService: SubTodoService,
    ) {}
  
    @Get('subtodos/:id')
    async getSubTodoById(@Param('id') id: string): Promise<SubTodoModel> {
      return this.subTodoService.subTodo({ id: Number(id) });
    }
  
    @Get('subtodos')
    async getSubTodos(): Promise<SubTodoModel[]> {
      return this.subTodoService.subTodos({
      });
    }
  
    @Post('subtodos')
    async createSubTodo(
      @Body() subTodoData: { parentId: number; content: string },
    ): Promise<SubTodoModel> {
        const {parentId, content} = subTodoData;
        return this.subTodoService.createSubTodo({
            content: content,
            parent: {
                connect: {id: parentId}
            }
        });
    }

    @Put('subtodos/:id')
    async updateSubTodo(@Param('id') id: string, @Body() subTodoData: {completed: boolean}): Promise<SubTodoModel> {
        const {completed} = subTodoData;
        return this.subTodoService.updateSubTodo({
        where: { id: Number(id) },
        data: { completed: completed }
      });
    }
  
    @Delete('subtodos/:id')
    async deleteSubTodo(@Param('id') id: string): Promise<SubTodoModel> {
      return this.subTodoService.deleteSubTodo({ id: Number(id) });
    }
  }