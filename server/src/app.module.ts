import { Module } from '@nestjs/common';
import { SubTodoController } from './controllers/subtodo.controller';
import { TodoController } from './controllers/todo.controller';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './services/prisma.service';
import { SubTodoService } from './services/subtodo.service';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [TodoController, UserController, SubTodoController],
  providers: [ UserService, TodoService, SubTodoService,PrismaService],
})
export class AppModule {}
