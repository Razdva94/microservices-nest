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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_task_dto_1 = require("./dto/update-task.dto");
const validation_pipe_1 = require("../pipes/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async createTask(taskDto, next, res, req) {
        const projectId = req.query.projectId;
        try {
            const task = await this.tasksService.createTask(taskDto, req, Number(projectId));
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Задача',
            };
            next(customError);
        }
    }
    async updateTask(id, taskDto, req, res, next) {
        const projectId = req.query.projectId;
        try {
            const task = await this.tasksService.updateTask(taskDto, Number(id), req, Number(projectId));
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Задача',
            };
            next(customError);
        }
    }
    async moveTaskWithinColumn(id, req, res, next) {
        try {
            const projectId = req.query.projectId;
            const oldPosition = req.query.oldPosition;
            const newPosition = req.query.newPosition;
            const task = await this.tasksService.moveTaskWithinColumn(Number(id), Number(oldPosition), Number(newPosition), Number(projectId), req);
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Задача',
            };
            next(customError);
        }
    }
    async moveTaskToOtherColumn(id, req, res, next) {
        try {
            const newColumnId = req.query.newColumnId;
            const projectId = req.query.projectId;
            const oldPosition = req.query.oldPosition;
            const newPosition = req.query.newPosition;
            const task = await this.tasksService.moveTaskToOtherColumn(Number(id), Number(oldPosition), Number(newPosition), Number(projectId), Number(newColumnId), req);
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Задача',
            };
            next(customError);
        }
    }
    async deleteTask(id, req, res, next) {
        const projectId = req.query.projectId;
        try {
            const task = await this.tasksService.deleteTask(Number(id), req, Number(projectId));
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Задача',
            };
            next(customError);
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат созданной задачи',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Function, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление данных задачи по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат обновленной задачи',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Перемещение задачи в пределах колонки' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор задачи' }),
    (0, swagger_1.ApiQuery)({ name: 'oldPosition', description: 'Изначальная позиция' }),
    (0, swagger_1.ApiQuery)({ name: 'newPosition', description: 'Новая позиция' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по задаче и новой позиции',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Patch)('/move-within/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "moveTaskWithinColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Перемещение задачи в другой колонку' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор Задачи' }),
    (0, swagger_1.ApiQuery)({ name: 'newColumnId', description: 'Новая колонка' }),
    (0, swagger_1.ApiQuery)({ name: 'oldPosition', description: 'Изначальная позиция' }),
    (0, swagger_1.ApiQuery)({ name: 'newPosition', description: 'Новая позиция' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация оп задачи и новой позиции',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Patch)('/move-outer/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "moveTaskToOtherColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление задачи' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по удаленной задачи',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('Задачи'),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map