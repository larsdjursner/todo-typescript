import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { jwtGenerate } from "../utils/jwtGenerate";
import validInfo from "../middleware/validInfo";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

//registration
router.post("/register", validInfo, async (req: Request, res: Response) => {
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
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: encryptPass,
      },
    });

    //5. generate jwt
    const token = jwtGenerate(newUser.id);
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

//login
router.post("/login", validInfo, async (req, res) => {
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

    //4. pass jwt
    const token = jwtGenerate(user.id);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verify", auth, async (req, res) => {
  try {
      res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

export default router;
