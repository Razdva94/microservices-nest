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
exports.TaskFieldsController = void 0;
const common_1 = require("@nestjs/common");
const task_fields_service_1 = require("./task-fields.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_task_filed_dto_1 = require("./dto/create-task-filed.dto");
const swagger_1 = require("@nestjs/swagger");
let TaskFieldsController = class TaskFieldsController {
    constructor(taskFieldsService) {
        this.taskFieldsService = taskFieldsService;
    }
    async createTaskField(taskFieldDto, next, res, req, taskId) {
        const projectId = req.query.projectId;
        try {
            const taskField = await this.taskFieldsService.createTaskField(taskFieldDto, req, Number(projectId), Number(taskId));
            res.send(taskField);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Поле задачи',
            };
            next(customError);
        }
    }
    async updateTaskField(taskFieldDto, next, res, req, taskId, taskFieldId) {
        const projectId = req.query.projectId;
        try {
            const taskField = await this.taskFieldsService.updateTaskField(taskFieldDto, req, Number(projectId), Number(taskId), Number(taskFieldId));
            res.send(taskField);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Поле задачи',
            };
            next(customError);
        }
    }
    async deleteTaskField(next, res, req, taskId, taskFieldId) {
        const projectId = req.query.projectId;
        try {
            console.log(Number(projectId), Number(taskFieldId));
            const taskField = await this.taskFieldsService.deleteTaskField(req, Number(projectId), Number(taskFieldId));
            res.send(taskField);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Поле задачи',
            };
            next(customError);
        }
    }
};
exports.TaskFieldsController = TaskFieldsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание поля задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат созданного поля задачи',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, swagger_1.ApiParam)({ name: 'taskId', description: 'Идентификатор задачи' }),
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_filed_dto_1.CreateTaskFieldDto, Function, Object, Object, String]),
    __metadata("design:returntype", Promise)
], TaskFieldsController.prototype, "createTaskField", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование поля задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат редактированного поля задачи',
    }),
    (0, swagger_1.ApiParam)({ name: 'taskId', description: 'Идентификатор задачи' }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, swagger_1.ApiParam)({ name: 'taskFieldId', description: 'Идентификатор поля' }),
    (0, common_1.Patch)('/update/:taskFieldId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Param)('taskId')),
    __param(5, (0, common_1.Param)('taskFieldId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_filed_dto_1.CreateTaskFieldDto, Function, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], TaskFieldsController.prototype, "updateTaskField", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление поля задачи' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат удаленного поля задачи',
    }),
    (0, swagger_1.ApiParam)({ name: 'taskId', description: 'Идентификатор задачи' }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, swagger_1.ApiParam)({ name: 'taskFieldId', description: 'Идентификатор поля' }),
    (0, common_1.Delete)('/delete/:taskFieldId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Next)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Param)('taskId')),
    __param(4, (0, common_1.Param)('taskFieldId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], TaskFieldsController.prototype, "deleteTaskField", null);
exports.TaskFieldsController = TaskFieldsController = __decorate([
    (0, swagger_1.ApiTags)('Поля задач'),
    (0, common_1.Controller)('task-fields/:taskId'),
    __metadata("design:paramtypes", [task_fields_service_1.TaskFieldsService])
], TaskFieldsController);
//# sourceMappingURL=task-fields.controller.js.map