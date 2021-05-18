import { PrismaClient } from "@prisma/client";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const { userId } = req.body;
  const todos = await prisma.todo.findMany({
    where: { userId: Number(userId) },
    include: { subtodos: true },
  });

  res.status(200).json(todos);
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const todo = await prisma.todo.findFirst({
    where: { id: Number(id), userId: userId },
    include: { subtodos: true },
  });
  res.status(200).json(todo);
});

router.post("/", auth, async (req, res) => {
  const { content, userId } = req.body;

  const todo = await prisma.todo.create({
    data: { content: content, userId: userId, completed: false },
  });
  res.status(200).json(todo);
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  await prisma.subTodo.updateMany({
    where: { parentId: Number(id) },
    data: { completed: completed },
  });

  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  res.status(200).json(todo);
});

router.delete(`/:id`, auth, async (req, res) => {
  const { id } = req.params;

  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(todo);
});

export default router;
