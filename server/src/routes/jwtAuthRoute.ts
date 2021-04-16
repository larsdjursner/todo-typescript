import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { jwtGenerate } from "../utils/jwtGenerate";
import validInfo from "../middleware/validInfo";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

//signup
router.post("/signup", validInfo, async (req: Request, res: Response) => {
  try {
    //1. unfold req.body
    const { email, password, name } = req.body;

    //2 if user exists then throw error
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (user) {
      return res.status(401).json("Email already in use");
    }

    //3. bcrypt the user password
    const salt = await genSalt(10);
    const encryptPass = await hash(password, salt);

    //4. enter new user inside DB
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: encryptPass,
      },
    });

    // create user to respond
    const newUser = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        todos: true,
      },
    });

    //5. generate jwt
    const token = jwtGenerate(newUser!.id);
    return res.status(200).json({ newUser, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

//signin
router.post("/signin", validInfo, async (req, res) => {
  try {
    //1. unfold req.body
    const { email, password } = req.body;

    //2. check user in db _> if not status(404)
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return res.status(404).json("Password or Email is incorrect");
    }
    //3. check if encrypt pass equals db pass -> if not status(401) wrong pass
    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return res.status(404).json("Password or Email is incorrect");
    }

    // create user to respond
    const newUser = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        todos: true,
      },
    });

    //4. pass jwt
    const token = jwtGenerate(newUser!.id);
    return res.status(200).json({ newUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verify", auth, async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: req.body.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    res.json({isAuth: true, user: user});
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default router;
