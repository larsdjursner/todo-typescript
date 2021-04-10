import { PrismaClient, Todo } from ".prisma/client";
import { Request, Response } from "express";

export class TodoController {
  private readonly prisma: PrismaClient;
  private userId: Number;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.userId = 1;

  }
  getTodos = async (req: Request, res: Response) => {
    // const { userId } = req.body;
    
    await this.prisma.todo.findMany({
      where: { userId: Number(this.userId) },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    })
    // return res.json(todos);
  };

  getTodoById = async (req: Request, res: Response) => {
      
  };

  // app.get("/todos/:id", async (req, res) => {
  //     const { id } = req.params;
  //     const todo = await prisma.todo.findFirst({
  //     where: { id: Number(id) },
  //     include: { subtodos: true },
  //     });
  //     res.json(todo);
  // });

  // app.post("/todos", async (req, res) => {
  //     const todo = await prisma.todo.create({
  //     data: { ...req.body, completed: false},
  //     });
  //     res.json(todo);
  // });

  // app.put("/todos/:id", async (req, res) => {
  //     const { id } = req.params;

  //     await prisma.subTodo.updateMany({
  //     where: {parentId: Number(id)},
  //     data: {...req.body}
  //     })

  //     const todo = await prisma.todo.update({
  //     where: { id: Number(id) },
  //     data: { ...req.body },
  //     });

  //     res.json(todo);
  // });

  // app.delete(`/todos/:id`, async (req, res) => {
  //     const { id } = req.params;
  //     await prisma.subTodo.deleteMany({
  //     where: {parentId: Number(id)}
  //     });
  //     const todo = await prisma.todo.delete({
  //     where: { id: Number(id) },
  //     });
  //     res.json(todo);
  // });
}
