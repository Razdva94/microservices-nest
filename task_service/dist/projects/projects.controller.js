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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const create_project_dto_1 = require("./dto/create-project.dto");
const projects_service_1 = require("./projects.service");
const update_project_dto_1 = require("./dto/update-project.dto");
const swagger_1 = require("@nestjs/swagger");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async createProject(projectDto, req, next, res) {
        try {
            const project = await this.projectsService.createProject(projectDto, req);
            res.send(project);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Проект',
            };
            next(customError);
        }
    }
    async updateProject(id, ProjectDto, req, res, next) {
        try {
            const project = await this.projectsService.updateProject(ProjectDto, Number(id), req);
            res.send(project);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Проект',
            };
            next(customError);
        }
    }
    async deleteProject(id, req, res, next) {
        try {
            const project = await this.projectsService.deleteProject(Number(id), req);
            res.send(project);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Проект',
            };
            next(customError);
        }
    }
    async getProjects(req, res, next) {
        try {
            const projects = await this.projectsService.getProjects(req);
            res.send(projects);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Проект',
            };
            next(customError);
        }
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание проекта' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат созданного проекта',
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto, Object, Function, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление данных проекта по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор проекта' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат обновленного проекта',
    }),
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "updateProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление проекта по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор проекта' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по удаленному проекта',
    }),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получение информации по проектам принадлежащим пользователю',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Информация по проектам пользователя',
    }),
    (0, common_1.Get)('/receive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjects", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Проекты'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map