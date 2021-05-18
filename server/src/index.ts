import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute";
import auth from "./middleware/auth";
import todosRoute from "./routes/todosRoute";
import subtodosRoute from "./routes/subtodosRoute";

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
});

//ROUTES
app.use("/auth", authRoute);
app.use("/todos", todosRoute);
app.use("/subtodos", subtodosRoute);

//ADMIN ONLY ROUTES eventually


app.listen(PORT, () => {
  console.log("REST API server ready at : http://localhost:%d", PORT);
});
