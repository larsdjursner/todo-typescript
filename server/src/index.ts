import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// routes
//user
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
  
  app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: { id: Number(id) },
      include: { todos: true },
    });
    res.json(user);
  });
  
  app.post("/users", async (req, res) => {
    const user = await prisma.user.create({
      data: { ...req.body },
    });
    res.json(user);
  });
  
  app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });
    res.json(user);
  });
  
  app.delete(`/users/:id`, async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(user);
  });
  
// todo
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findFirst({
    where: { id: Number(id) },
    include: { subtodos: true },
  });
  res.json(todo);
});

app.post("/todos", async (req, res) => {
  const todo = await prisma.todo.create({
    data: { ...req.body },
  });
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });
  res.json(todo);
});

app.delete(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.json(todo);
});

// subtodo
app.get("/subtodos", async (req, res) => {
  const subTodos = await prisma.subTodo.findMany();
  res.json(subTodos);
});

app.get("/subtodos/:id", async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.findFirst({
    where: { id: Number(id) },
  });
  res.json(subTodo);
});

app.post("/subtodos", async (req, res) => {
  const subTodo = await prisma.subTodo.create({
    data: { ...req.body },
  });
  res.json(subTodo);
});

app.put('/subtodos/:id', async (req, res) => {
    const { id } = req.params;
    const subTodo = await prisma.subTodo.update({
        where: { id: Number(id) },
        data: { ...req.body },
      })
      res.json(subTodo);
})

app.delete(`/subtodos/:id`, async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.delete({
    where: { id: Number(id) },
  });
  res.json(subTodo);
});

app.listen(3001, () => {
  console.log("REST API server ready at : http://localhost:3001");
});
