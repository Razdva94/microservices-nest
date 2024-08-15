"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_controller_1 = require("./tasks.controller");
const tasks_service_1 = require("./tasks.service");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const microservices_1 = require("@nestjs/microservices");
const rabbit_service_1 = require("../rabbit/rabbit.service");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        controllers: [tasks_controller_1.TasksController],
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_INFO_TRANSPORT',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [`${process.env.RABBIT_SERVICE_DOCKER}`],
                        queue: 'auth_service_queue',
                        queueOptions: { durable: true },
                    },
                },
            ]),
        ],
        providers: [tasks_service_1.TasksService, task_project_razdva1994_1.PrismaService, rabbit_service_1.RabbitService],
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map