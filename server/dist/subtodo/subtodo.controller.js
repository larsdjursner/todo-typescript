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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTodoController = void 0;
const common_1 = require("@nestjs/common");
const subtodo_service_1 = require("./subtodo.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SubTodoController = class SubTodoController {
    constructor(subTodoService) {
        this.subTodoService = subTodoService;
    }
    async getSubTodoById(id) {
        return this.subTodoService.subTodo({ id: Number(id) });
    }
    async getSubTodos() {
        return this.subTodoService.subTodos({});
    }
    async createSubTodo(subTodoData) {
        const { parentId, content } = subTodoData;
        return this.subTodoService.createSubTodo({
            content: content,
            parent: {
                connect: { id: parentId },
            },
        });
    }
    async updateSubTodo(id, subTodoData) {
        const { completed } = subTodoData;
        return this.subTodoService.updateSubTodo({
            where: { id: Number(id) },
            data: { completed: completed },
        });
    }
    async deleteSubTodo(id) {
        return this.subTodoService.deleteSubTodo({ id: Number(id) });
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('subtodos/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubTodoController.prototype, "getSubTodoById", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('subtodos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubTodoController.prototype, "getSubTodos", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('subtodos'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubTodoController.prototype, "createSubTodo", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('subtodos/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubTodoController.prototype, "updateSubTodo", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('subtodos/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubTodoController.prototype, "deleteSubTodo", null);
SubTodoController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [subtodo_service_1.SubTodoService])
], SubTodoController);
exports.SubTodoController = SubTodoController;
//# sourceMappingURL=subtodo.controller.js.map