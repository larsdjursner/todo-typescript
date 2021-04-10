"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(prisma) {
        this.getTodos = async (req, res) => {
            await this.prisma.todo.findMany({
                where: { userId: Number(this.userId) },
            })
                .then((data) => {
                res.json(data);
            })
                .catch((err) => {
                res.status(500).json({ error: err.message });
            });
        };
        this.getTodoById = async (req, res) => {
        };
        this.prisma = prisma;
        this.userId = 1;
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todocontroller.js.map