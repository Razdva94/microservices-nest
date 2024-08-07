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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const common_2 = require("@task-project/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(userDto, next, res) {
        try {
            const user = await this.usersService.createUser(userDto);
            res.send(user);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async getAll(next, res) {
        try {
            const user = await this.usersService.getAllUsers();
            res.send(user);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async getById(id, next, res) {
        try {
            const user = await this.usersService.getUserId(id);
            res.send(user);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async deleteById(id, next, res) {
        try {
            const userId = await this.usersService.deleteUserById(id);
            res.send({ message: `User ${userId} deleted successfully` });
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async update(id, updateUserDto, next, res) {
        try {
            const user = await this.usersService.updateUser(id, updateUserDto);
            res.send(user);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async delete(next, res) {
        try {
            await this.usersService.delete();
            res.send({ message: `Все пользователи удалены` });
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание пользователя' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат созданного пользователя',
    }),
    (0, common_1.Post)('/create'),
    (0, common_1.UsePipes)(common_2.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех пользователей' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат всех пользователей',
    }),
    (0, common_1.Get)('/receive-all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Next)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение пользователя по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор пользователя' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат пользователя по id',
    }),
    (0, common_1.Get)('receive/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление пользователя по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор пользователя' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат удаленного пользователя',
    }),
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Next)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление данных пользователя по идентификатору' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Идентификатор пользователя' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат обновленного пользователя',
    }),
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.UsePipes)(common_2.ValidationPipe),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление всех пользователей' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)('/delete-all'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Сообщение о удалении всех пользователей',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Next)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map