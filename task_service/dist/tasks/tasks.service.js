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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@task-project/common");
const enums_1 = require("../enums/enums");
const rabbit_service_1 = require("../rabbit/rabbit.service");
let TasksService = class TasksService {
    constructor(prisma, rabbitService) {
        this.prisma = prisma;
        this.rabbitService = rabbitService;
    }
    async moveTaskToOtherColumn(id, oldPosition, newPosition, projectId, newColumnId, req) {
        const userInfo = await this.rabbitService.sendToken(req);
        const userId = userInfo?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Переместить);
        const task = await this.prisma.tasks.findFirst({
            where: {
                id: id,
                position: oldPosition,
            },
        });
        if (!task) {
            throw new common_1.BadRequestException('Задача не найдена');
        }
        const newColumn = await this.prisma.columns.findFirst({
            where: {
                id: newColumnId,
                projectId,
            },
        });
        if (!newColumn) {
            throw new common_1.BadRequestException('Колонка не найдена');
        }
        const oldColumn = await this.prisma.columns.findFirst({
            where: {
                id: task.columnId,
                projectId,
            },
        });
        if (!oldColumn) {
            throw new common_1.BadRequestException('Колонка не найдена');
        }
        if (oldColumn.projectId !== projectId) {
            throw new common_1.BadRequestException('Вы не можете переместить эту задачу');
        }
        await this.prisma.tasks.updateMany({
            where: {
                columnId: oldColumn.id,
                position: {
                    gte: oldPosition,
                },
            },
            data: {
                position: {
                    decrement: 1,
                },
            },
        });
        await this.prisma.tasks.updateMany({
            where: {
                columnId: newColumn.id,
                position: {
                    gte: newPosition,
                },
            },
            data: {
                position: {
                    increment: 1,
                },
            },
        });
        const newTask = await this.prisma.tasks.update({
            where: {
                id: id,
            },
            data: {
                columnId: newColumn.id,
                position: newPosition,
            },
        });
        return `Задача ${newTask.name} перемещена c ${oldPosition} на ${newPosition} позицию в колонку ${newColumn.name}`;
    }
    async moveTaskWithinColumn(id, oldPosition, newPosition, projectId, req) {
        const userInfo = await this.rabbitService.sendToken(req);
        const userId = userInfo?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Переместить);
        const task = await this.prisma.tasks.findFirst({
            where: {
                id: id,
                position: oldPosition,
            },
        });
        if (!task) {
            throw new common_1.BadRequestException('Задача не найдена');
        }
        const column = await this.prisma.columns.findFirst({
            where: {
                id: task.columnId,
            },
        });
        if (!column) {
            throw new common_1.BadRequestException('Колонка не найдена');
        }
        if (column.projectId !== projectId) {
            throw new common_1.BadRequestException('Вы не можете переместить задачу в эту колонку');
        }
        if (oldPosition === newPosition) {
            return task;
        }
        if (newPosition > oldPosition) {
            await this.prisma.tasks.updateMany({
                where: {
                    columnId: column.id,
                    position: {
                        gte: oldPosition,
                        lte: newPosition,
                    },
                },
                data: {
                    position: {
                        decrement: 1,
                    },
                },
            });
        }
        else {
            await this.prisma.tasks.updateMany({
                where: {
                    columnId: column.id,
                    position: {
                        gte: newPosition,
                        lte: oldPosition,
                    },
                },
                data: {
                    position: {
                        increment: 1,
                    },
                },
            });
        }
        const newTask = await this.prisma.tasks.update({
            where: {
                id: id,
            },
            data: {
                position: newPosition,
            },
        });
        return `Задача ${newTask.name} перемещена c ${oldPosition} на ${newPosition} позицию в колонке ${column.name}`;
    }
    async createTask(dto, req, projectId) {
        const userInfo = await this.rabbitService.sendToken(req);
        const userId = userInfo?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Создать);
        const column = await this.prisma.columns.findFirst({
            where: {
                id: dto.columnId,
                projectId: projectId,
            },
        });
        if (!column) {
            throw new common_1.BadRequestException('Вы не можете создать задачу в эту колонку');
        }
        const maxPosition = await this.prisma.tasks.aggregate({
            _max: {
                position: true,
            },
            where: {
                columnId: dto.columnId,
                projectId: projectId,
            },
        });
        const maxPosValue = maxPosition._max.position;
        const position = maxPosValue !== null ? maxPosValue + 1 : 1;
        const task = await this.prisma.tasks.create({
            data: {
                ...dto,
                position,
                projectId,
            },
        });
        return task;
    }
    async updateTask(dto, id, req, projectId) {
        const userInfo = await this.rabbitService.sendToken(req);
        const userId = userInfo?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Редактировать);
        const task = await this.prisma.tasks.update({
            where: {
                id: id,
            },
            data: { ...dto },
        });
        return task;
    }
    async deleteTask(id, req, projectId) {
        const userInfo = await this.rabbitService.sendToken(req);
        const userId = userInfo?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Удалить);
        const taskToDelete = await this.prisma.tasks.findUnique({
            where: { id: id },
        });
        if (!taskToDelete) {
            throw new common_1.BadRequestException('Задача не найдена');
        }
        const columnId = taskToDelete.columnId;
        await this.prisma.tasks.delete({
            where: { id: Number(id) },
        });
        const orphanedFields = await this.prisma.taskField.findMany({
            where: {
                OR: [
                    { stringValues: { none: {} } },
                    { numberValues: { none: {} } },
                    { enumValues: { none: {} } },
                ],
            },
        });
        for (const field of orphanedFields) {
            await this.prisma.taskField.delete({
                where: { id: field.id },
            });
        }
        const tasksInColumn = await this.prisma.tasks.findMany({
            where: { columnId: columnId },
            orderBy: { position: 'asc' },
        });
        for (let i = 0; i < tasksInColumn.length; i++) {
            await this.prisma.tasks.update({
                where: { id: tasksInColumn[i].id },
                data: { position: i + 1 },
            });
        }
        return { message: 'Задача успешно удалена и позиции обновлены' };
    }
    async validateUserProject(userId, projectId, action) {
        if (userId === undefined) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        const project = await this.prisma.projects.findFirst({
            where: {
                id: projectId,
                userId: userId,
            },
        });
        if (!project) {
            throw new common_1.BadRequestException(`Вы не можете ${enums_1.Action[action].toLowerCase()} задачу в этом проекте`);
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_2.PrismaService,
        rabbit_service_1.RabbitService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map