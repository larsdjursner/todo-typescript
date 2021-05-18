import { PrismaClient } from "@prisma/client";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const subTodos = await prisma.subTodo.findMany();
  res.status(200).json(subTodos);
});

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.findFirst({
    where: { id: Number(id) },
  });
  res.status(200).json(subTodo);
});

router.post("/", auth, async (req, res) => {
  const { content, parentId } = req.body;

  const subTodo = await prisma.subTodo.create({
    data: { content: content, parentId: parentId, completed: false },
  });
  res.status(200).json(subTodo);
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const subTodo = await prisma.subTodo.update({
    where: { id: Number(id) },
    data: { completed: completed },
  });
  res.status(200).json(subTodo);
});

router.delete(`/:id`, auth, async (req, res) => {
  const { id } = req.params;
  const subTodo = await prisma.subTodo.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(subTodo);
});

export default router;
