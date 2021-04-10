"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const cors_1 = require("cors");
const todocontroller_1 = require("./controllers/todocontroller");
const prisma = new client_1.PrismaClient();
const app = express_1.default();
if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
app.use(express_1.default.json());
app.use(cors_1.default());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});
const tc = new todocontroller_1.TodoController(prisma);
app.get("/todos", tc.getTodos);
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
        data: Object.assign(Object.assign({}, req.body), { completed: false }),
    });
    res.json(todo);
});
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.subTodo.updateMany({
        where: { parentId: Number(id) },
        data: Object.assign({}, req.body)
    });
    const todo = await prisma.todo.update({
        where: { id: Number(id) },
        data: Object.assign({}, req.body),
    });
    res.json(todo);
});
app.delete(`/todos/:id`, async (req, res) => {
    const { id } = req.params;
    await prisma.subTodo.deleteMany({
        where: { parentId: Number(id) }
    });
    const todo = await prisma.todo.delete({
        where: { id: Number(id) },
    });
    res.json(todo);
});
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
        data: Object.assign(Object.assign({}, req.body), { completed: false }),
    });
    res.json(subTodo);
});
app.put('/subtodos/:id', async (req, res) => {
    const { id } = req.params;
    const subTodo = await prisma.subTodo.update({
        where: { id: Number(id) },
        data: Object.assign({}, req.body),
    });
    res.json(subTodo);
});
app.delete(`/subtodos/:id`, async (req, res) => {
    const { id } = req.params;
    const subTodo = await prisma.subTodo.delete({
        where: { id: Number(id) },
    });
    res.json(subTodo);
});
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
        data: Object.assign({}, req.body),
    });
    res.json(user);
});
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: Object.assign({}, req.body),
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
app.listen(PORT, () => {
    console.log("REST API server ready at : http://localhost:3001");
});
//# sourceMappingURL=index.js.map