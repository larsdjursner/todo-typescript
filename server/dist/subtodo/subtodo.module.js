"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTodoModule = void 0;
const common_1 = require("@nestjs/common");
const subtodo_service_1 = require("./subtodo.service");
const subtodo_controller_1 = require("./subtodo.controller");
const prisma_service_1 = require("../prisma.service");
let SubTodoModule = class SubTodoModule {
};
SubTodoModule = __decorate([
    common_1.Module({
        providers: [subtodo_service_1.SubTodoService, prisma_service_1.PrismaService],
        exports: [subtodo_service_1.SubTodoService],
        controllers: [subtodo_controller_1.SubTodoController]
    })
], SubTodoModule);
exports.SubTodoModule = SubTodoModule;
//# sourceMappingURL=subtodo.module.js.map