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
exports.SubTodoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let SubTodoService = class SubTodoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async subTodo(todoWhereUniqueInput) {
        return this.prisma.subTodo.findUnique({
            where: todoWhereUniqueInput,
        });
    }
    async subTodos(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.subTodo.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createSubTodo(data) {
        return this.prisma.subTodo.create({
            data,
        });
    }
    async updateSubTodo(params) {
        const { data, where } = params;
        return this.prisma.subTodo.update({
            data,
            where,
        });
    }
    async deleteSubTodo(where) {
        return this.prisma.subTodo.delete({
            where,
        });
    }
};
SubTodoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubTodoService);
exports.SubTodoService = SubTodoService;
//# sourceMappingURL=subtodo.service.js.map