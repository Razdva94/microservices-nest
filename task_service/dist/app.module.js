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
const config_1 = require("@nestjs/config");
const common_2 = require("@task-project/common");
const tasks_module_1 = require("./tasks/tasks.module");
const columns_module_1 = require("./columns/columns.module");
const projects_module_1 = require("./projects/projects.module");
const task_fields_module_1 = require("./task-fields/task-fields.module");
const microservices_1 = require("@nestjs/microservices");
const rabbit_service_1 = require("./rabbit/rabbit.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [common_2.PrismaService, rabbit_service_1.RabbitService],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqp://localhost:5672'],
                        queue: 'auth_service_queue',
                        queueOptions: {
                            durable: true,
                        },
                    },
                },
            ]),
            tasks_module_1.TasksModule,
            columns_module_1.ColumnsModule,
            projects_module_1.ProjectsModule,
            task_fields_module_1.TaskFieldsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map