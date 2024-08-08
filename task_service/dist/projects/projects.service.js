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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@task-project/common");
const rabbit_service_1 = require("../rabbit/rabbit.service");
const microservices_1 = require("@nestjs/microservices");
var TaskFieldValueType;
(function (TaskFieldValueType) {
    TaskFieldValueType["ENUM"] = "TaskFieldValueEnum";
    TaskFieldValueType["NUMBER"] = "TaskFieldValueNumber";
    TaskFieldValueType["STRING"] = "TaskFieldValueString";
})(TaskFieldValueType || (TaskFieldValueType = {}));
let ProjectsService = class ProjectsService {
    constructor(prisma, rabbitService, client) {
        this.prisma = prisma;
        this.rabbitService = rabbitService;
        this.client = client;
    }
    async getProjects(req) {
        const userInfo = await this.rabbitService.sendToken(req);
        console.log(userInfo);
        const userId = userInfo?.id;
        if (userId === undefined) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        const projects = await this.prisma.projects.findMany({
            where: {
                userId: userId,
            },
        });
        const columns = await this.prisma.columns.findMany({
            where: {
                projectId: {
                    in: projects.map((project) => project.id),
                },
            },
        });
        const tasks = await this.prisma.tasks.findMany({
            where: {
                columnId: {
                    in: columns.map((column) => column.id),
                },
            },
        });
        const findTaskFieldValue = async (taskFieldValueType, tasks) => {
            const taskfield = await this.prisma[`${taskFieldValueType}`].findMany({
                where: {
                    taskId: {
                        in: tasks.map((task) => task.id),
                    },
                },
            });
            return taskfield;
        };
        const taskFieldValueNumber = await findTaskFieldValue(TaskFieldValueType.NUMBER, tasks);
        const taskFieldValueString = await findTaskFieldValue(TaskFieldValueType.STRING, tasks);
        const taskFieldValueEnum = await findTaskFieldValue(TaskFieldValueType.ENUM, tasks);
        const taskFields = await this.prisma.taskField.findMany({
            where: {
                id: {
                    in: [
                        ...taskFieldValueString.map((taskFieldValue) => taskFieldValue.taskFieldId),
                        ...taskFieldValueNumber.map((taskFieldValue) => taskFieldValue.taskFieldId),
                        ...taskFieldValueEnum.map((taskFieldValue) => taskFieldValue.taskFieldId),
                    ],
                },
            },
        });
        const projectEntities = projects.map((project) => {
            const columnEntities = columns
                .filter((column) => column.projectId === project.id)
                .map((column) => {
                const taskEntities = tasks
                    .filter((task) => task.columnId === column.id)
                    .map((task) => {
                    const taskFieldValueEntities = [
                        ...taskFieldValueString.filter((taskFieldValue) => taskFieldValue.taskId === task.id),
                        ...taskFieldValueNumber.filter((taskFieldValue) => taskFieldValue.taskId === task.id),
                        ...taskFieldValueEnum.filter((taskFieldValue) => taskFieldValue.taskId === task.id),
                    ];
                    const taskFieldIds = taskFieldValueEntities.map((taskFieldValue) => {
                        return taskFieldValue.taskFieldId;
                    });
                    const taskFieldsFiltered = taskFields.filter((taskField) => {
                        return taskFieldIds.includes(taskField.id);
                    });
                    const taskFieldEntities = [];
                    for (let i = 0; i < taskFieldsFiltered.length; i++) {
                        taskFieldEntities.push({
                            name: taskFieldsFiltered[i].name,
                            value: taskFieldValueEntities.find((entity) => {
                                return entity.taskFieldId === taskFieldsFiltered[i].id;
                            }).value,
                        });
                    }
                    return {
                        ...task,
                        taskFields: taskFieldEntities,
                    };
                });
                return { ...column, tasks: taskEntities };
            });
            return { ...project, columns: columnEntities };
        });
        const names = projectEntities.map((project) => project.name);
        return { names, projectEntities };
    }
    async createProject(dto, req) {
        const userId = req?.user?.id;
        if (userId === undefined) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        const project = this.prisma.projects.create({
            data: {
                ...dto,
                userId,
            },
        });
        return project;
    }
    async deleteProject(id, req) {
        const userId = req?.user?.id;
        if (userId === undefined) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        const project = await this.prisma.projects.delete({
            where: {
                id: id,
                userId: userId,
            },
        });
        return {
            message: `Проект ${project.name} удален со всеми задачами`,
        };
    }
    updateProject(ProjectDto, id, req) {
        const userId = req?.user?.id;
        if (userId === undefined) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        const project = this.prisma.projects.update({
            where: {
                id: id,
                userId: userId,
            },
            data: {
                ...ProjectDto,
            },
        });
        return project;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [common_2.PrismaService,
        rabbit_service_1.RabbitService,
        microservices_1.ClientProxy])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map