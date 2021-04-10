"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const todo_controller_1 = require("./todo.controller");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const prisma_service_1 = require("../prisma.service");
const jwt_strategy_1 = require("../auth/jwt.strategy");
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    common_1.Module({
        providers: [todo_service_1.TodoService, prisma_service_1.PrismaService],
        exports: [todo_service_1.TodoService],
        controllers: [todo_controller_1.TodoController]
    })
], TodoModule);
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map