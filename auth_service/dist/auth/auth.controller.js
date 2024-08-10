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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const task_project_razdva1994_1 = require("task-project-razdva1994");
const login_user_dto_1 = require("./dto/login-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(userDto, res, next) {
        try {
            const result = await this.authService.login(userDto, res);
            res.send(result);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async registration(userDto, res, next) {
        try {
            const result = await this.authService.registration(userDto);
            res.send(result);
        }
        catch (error) {
            const customError = error;
            customError.options = {
                name: 'Пользователь',
            };
            next(customError);
        }
    }
    async refreshTokens(res, req) {
        const tokenInfo = req.cookies.refreshToken;
        const result = await this.authService.refreshTokens(tokenInfo, res);
        return res.send(result);
    }
    async logout(res, req) {
        const tokenInfo = req.cookies.refreshToken;
        await this.authService.logout(tokenInfo, res);
        return res.send({ message: 'Logout successful' });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Логин пользователя' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат токенов(access и refresh)',
    }),
    (0, common_2.Post)('/login'),
    (0, common_2.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация пользователя' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат нового пользователя',
    }),
    (0, common_2.Post)('/registration'),
    (0, common_2.UsePipes)(task_project_razdva1994_1.ValidationPipe),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registration", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление токенов' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Возврат новых токенов(access и refresh)',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)('/refresh-token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Выход из аккаунта' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Сообщение о выходе из аккаунта',
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_2.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Авторизация'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map