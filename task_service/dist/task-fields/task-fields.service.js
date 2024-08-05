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
exports.TaskFieldsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@task-project/common");
const client_1 = require("@prisma/client");
const enums_1 = require("../enums/enums");
var TaskFieldName;
(function (TaskFieldName) {
    TaskFieldName["ENUM"] = "TaskFieldValueEnum";
    TaskFieldName["NUMBER"] = "TaskFieldValueNumber";
    TaskFieldName["STRING"] = "TaskFieldValueString";
})(TaskFieldName || (TaskFieldName = {}));
let TaskFieldsService = class TaskFieldsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateTaskField(taskFieldDto, req, projectId, taskId, taskFieldId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Редактировать);
        const taskField = await this.prisma.taskField.findFirst({
            where: {
                id: taskFieldId,
            },
        });
        const oldFieldType = taskField.type;
        const { value } = taskFieldDto;
        const fieldType = this.determineFieldType(value);
        const updatedTaskField = await this.prisma.taskField.update({
            where: {
                id: taskFieldId,
            },
            data: {
                name: taskFieldDto.name,
                type: fieldType,
            },
        });
        let taskFieldValue;
        if (oldFieldType === updatedTaskField.type) {
            taskFieldValue = await this.prisma[TaskFieldName[updatedTaskField.type]].update({
                where: {
                    taskId_taskFieldId: {
                        taskId,
                        taskFieldId,
                    },
                },
                data: {
                    value: { set: value },
                },
            });
        }
        else {
            await this.prisma[TaskFieldName[oldFieldType]].delete({
                where: {
                    taskId_taskFieldId: {
                        taskId,
                        taskFieldId,
                    },
                },
            });
            taskFieldValue = await this.createTaskFieldValue(value, taskField.id, taskId, fieldType);
        }
        return { updatedTaskField, taskFieldValue };
    }
    async createTaskField(taskFieldDto, req, projectId, taskId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Создать);
        const { value } = taskFieldDto;
        const fieldType = this.determineFieldType(value);
        const taskField = await this.findOrCreateTaskField(taskFieldDto.name, fieldType);
        await this.createTaskFieldValue(value, taskField.id, taskId, fieldType);
        return taskFieldDto;
    }
    async deleteTaskField(req, projectId, taskFieldId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Удалить);
        return await this.prisma.taskField.delete({
            where: {
                id: taskFieldId,
            },
        });
    }
    determineFieldType(value) {
        if (typeof value === 'string') {
            if (Object.values(client_1.TaskFieldEnumOptions).includes(value)) {
                return client_1.FieldType.ENUM;
            }
            return client_1.FieldType.STRING;
        }
        else if (typeof value === 'number') {
            return client_1.FieldType.NUMBER;
        }
        throw new common_1.BadRequestException('Невалидное значение для поля value');
    }
    async findOrCreateTaskField(name, type, extra = { skipCreation: false }) {
        let taskField = await this.prisma.taskField.findFirst({
            where: {
                name,
                type,
            },
        });
        if (!extra.skipCreation) {
            if (!taskField) {
                taskField = await this.prisma.taskField.create({
                    data: {
                        name,
                        type,
                    },
                });
            }
        }
        if (!taskField) {
            throw new common_1.BadRequestException('Поле задачи не найдено');
        }
        return taskField;
    }
    async createTaskFieldValue(value, taskFieldId, taskId, fieldType) {
        let modelName;
        if (fieldType === 'ENUM') {
            modelName = TaskFieldName.ENUM;
        }
        else if (fieldType === 'NUMBER') {
            modelName = TaskFieldName.NUMBER;
        }
        else if (fieldType === 'STRING') {
            modelName = TaskFieldName.STRING;
        }
        else {
            throw new common_1.BadRequestException('Невалидное значение для типа поля');
        }
        return await this.prisma[modelName].create({
            data: {
                value,
                taskFieldId,
                taskId,
            },
        });
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
exports.TaskFieldsService = TaskFieldsService;
exports.TaskFieldsService = TaskFieldsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_2.PrismaService])
], TaskFieldsService);
//# sourceMappingURL=task-fields.service.js.map