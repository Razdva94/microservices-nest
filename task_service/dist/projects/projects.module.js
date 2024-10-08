"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const projects_controller_1 = require("./projects.controller");
const projects_service_1 = require("./projects.service");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const rabbit_service_1 = require("../rabbit/rabbit.service");
const clients_module_1 = require("@nestjs/microservices/module/clients.module");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            clients_module_1.ClientsModule.register([
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
        controllers: [projects_controller_1.ProjectsController],
        providers: [projects_service_1.ProjectsService, task_project_razdva1994_1.PrismaService, rabbit_service_1.RabbitService],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map