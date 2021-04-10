import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
  private readonly todoService: TodoService;

  constructor(todoService : TodoService) {
    this.todoService = todoService;
  }

  getTodos = async (req: Request, res: Response) => {

  };

  getTodoById = async (req: Request, res: Response) => {
      
  };

 
}
