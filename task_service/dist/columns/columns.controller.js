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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const columns_service_1 = require("./columns.service");
const create_column_dto_1 = require("./dto/create-column.dto");
const update_column_dto_1 = require("./dto/update-column.dto");
const swagger_1 = require("@nestjs/swagger");
let ColumnsController = class ColumnsController {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    async createColumn(columnDto, req, next, res) {
        const projectId = req.query.projectId;
        try {
            const column = await this.columnsService.createColumn(columnDto, req, Number(projectId));
            res.send(column);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Колонка',
            };
            next(customError);
        }
    }
    async updateColumn(id, ColumnDto, req, res, next) {
        const projectId = req.query.projectId;
        try {
            const column = await this.columnsService.updateColumn(ColumnDto, id, req, Number(projectId));
            res.send(column);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Колонка',
            };
            next(customError);
        }
    }
    async deleteColumn(id, req, res, next) {
        const projectId = req.query.projectId;
        try {
            const column = await this.columnsService.deleteColumn(id, req, Number(projectId));
            res.send(column);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Колонка',
            };
            next(customError);
        }
    }
    async moveColumn(id, req, res, next) {
        try {
            const projectId = req.query.projectId;
            const oldPosition = req.query.oldPosition;
            const newPosition = req.query.newPosition;
            const task = await this.columnsService.moveColumn(Number(id), Number(oldPosition), Number(newPosition), Number(projectId), req);
            res.send(task);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Колонка',
            };
            next(customError);
        }
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание колонки' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат созданной колонки',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Post)('/create'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_column_dto_1.CreateColumnDto, Object, Function, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "createColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление данных колонки по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор колонки' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат обновленной колонки',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_column_dto_1.UpdateColumnDto, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "updateColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление колонки по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор колонки' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по удаленной колонке',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "deleteColumn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Перемещение колонки' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор колонки' }),
    (0, swagger_1.ApiQuery)({ name: 'oldPosition', description: 'Изначальная позиция' }),
    (0, swagger_1.ApiQuery)({ name: 'newPosition', description: 'Новая позиция' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по колонке и новой позиции',
    }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', description: 'Идентификатор проекта' }),
    (0, common_1.Patch)('/move/:id'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "moveColumn", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, swagger_1.ApiTags)('Колонки'),
    (0, common_1.Controller)('columns'),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map