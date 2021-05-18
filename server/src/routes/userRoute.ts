import { PrismaClient } from "@prisma/client";
import express from "express";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

router.post("/", auth, async (req, res) => {
  const { id } = req.body.user;
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      email: true,
      name: true,
      todos: true,
    },
  });

  res.status(200).json(user);
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name: name, email: email },
  });
  res.status(200).json(user);
});

router.delete(`/:id`, auth, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  });
  res.status(200).json(user);
});
