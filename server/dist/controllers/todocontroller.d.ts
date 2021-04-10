import { PrismaClient } from ".prisma/client";
import { Request, Response } from "express";
export declare class TodoController {
    private readonly prisma;
    private userId;
    constructor(prisma: PrismaClient);
    getTodos: (req: Request, res: Response) => Promise<void>;
    getTodoById: (req: Request, res: Response) => Promise<void>;
}
