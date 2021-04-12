import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.header("token");

  if (!jwtToken) {
    return res.status(403).json("Not Authorized");
  }

  try {
    const verify = jwt.verify(jwtToken, process.env.JWTSECRET as string);

    const { user } = verify as IUserToken;

    req.body.user = user;
    console.log(req.body.user);
    next();

  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized");
  }
};


interface IUserToken {
    user: {
        id: number
    },
    iat : number,
    exp: number
}