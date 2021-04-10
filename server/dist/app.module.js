"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const subtodo_controller_1 = require("./controllers/subtodo.controller");
const todo_controller_1 = require("./controllers/todo.controller");
const user_controller_1 = require("./controllers/user.controller");
const prisma_service_1 = require("./services/prisma.service");
const subtodo_service_1 = require("./services/subtodo.service");
const todo_service_1 = require("./services/todo.service");
const user_service_1 = require("./services/user.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [todo_controller_1.TodoController, user_controller_1.UserController, subtodo_controller_1.SubTodoController],
        providers: [user_service_1.UserService, todo_service_1.TodoService, subtodo_service_1.SubTodoService, prisma_service_1.PrismaService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map