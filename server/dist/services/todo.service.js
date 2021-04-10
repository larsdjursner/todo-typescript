"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let TodoService = class TodoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async todo(todoWhereUniqueInput) {
        return this.prisma.todo.findUnique({
            where: todoWhereUniqueInput,
        });
    }
    async todos(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.todo.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createTodo(data) {
        return this.prisma.todo.create({
            data,
        });
    }
    async updateTodo(params) {
        const { data, where } = params;
        return this.prisma.todo.update({
            data,
            where,
        });
    }
    async deleteTodo(where) {
        return this.prisma.todo.delete({
            where,
        });
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map