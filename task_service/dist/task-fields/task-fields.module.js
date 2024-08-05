"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFieldsModule = void 0;
const common_1 = require("@nestjs/common");
const task_fields_controller_1 = require("./task-fields.controller");
const task_fields_service_1 = require("./task-fields.service");
const auth_module_1 = require("../auth/auth.module");
const common_2 = require("@task-project/common");
let TaskFieldsModule = class TaskFieldsModule {
};
exports.TaskFieldsModule = TaskFieldsModule;
exports.TaskFieldsModule = TaskFieldsModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        controllers: [task_fields_controller_1.TaskFieldsController],
        providers: [task_fields_service_1.TaskFieldsService, common_2.PrismaService],
    })
], TaskFieldsModule);
//# sourceMappingURL=task-fields.module.js.map