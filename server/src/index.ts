import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import authRoute from "./routes/jwtAuthRoute";
import auth from "./middleware/auth";

const prisma = new PrismaClient();
const app = express();

if (!process.env.PORT) {
  process.exit(1);
}

//config 
const PORT: number = parseInt(process.env.PORT as string, 10);
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
}) 


//ROUTES

//register and login
app.use("/auth", authRoute)

// todo

// app.use("/todo", auth,)
app.get("/todos", auth, async (req, res) => {
  const user = req.body.user;

  const todos = await prisma.todo.findMany({
    where: {userId: Number(user.id)}
  });
  res.status(200).json(todos);
});

app.get("/todos/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user = req.body.user;

  const todo = await prisma.todo.findFirst({
    where: { id: Number(id), user: user},
    include: { subtodos: true },
  });
  res.status(200).json(todo);
});

app.post("/todos", auth, async (req, res) => {
  const user = req.body.user;

  const todo = await prisma.todo.create({
    data: { ...req.body, user: user, completed: false},
  });
  res.status(200).json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.subTodo.updateMany({
    where: {parentId: Number(id)},
    data: {...req.body}
  })
  
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  res.status(200).json(todo);
});

app.delete(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  // await prisma.subTodo.deleteMany({
  //   where: {parentId: Number(id)}
  // });
  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(todo);
});

// subtodo
app.get("/subtodos", async (req, res) => {
  const subTodos = await prisma.subTodo.findMany();
  res.status(200).json(subTodos);
});

app.get("/subtodos/:id", async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.findFirst({
    where: { id: Number(id) },
  });
  res.status(200).json(subTodo);
});

app.post("/subtodos", async (req, res) => {
  const subTodo = await prisma.subTodo.create({
    data: { ...req.body, completed: false},
  });
  res.status(200).json(subTodo);
});

app.put('/subtodos/:id', async (req, res) => {
    const { id } = req.params;
    const subTodo = await prisma.subTodo.update({
        where: { id: Number(id) },
        data: { ...req.body },
      })
      res.status(200).json(subTodo);
})

app.delete(`/subtodos/:id`, async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(subTodo);
});

//user  needs to be inaccesible
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
    include: { todos: true },
  });
  res.status(200).json(user);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });
  res.status(200).json(user);
});

app.delete(`/users/:id`, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(user);
});



app.listen(PORT, () => {
  console.log("REST API server ready at : http://localhost:%d", PORT);
});

