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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const common_2 = require("@task-project/common");
let AuthService = class AuthService {
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login(userDto, res) {
        const user = await this.validateUser(userDto);
        const accessToken = await this.generateAccessToken(user);
        await this.prisma.refreshTokens.deleteMany({
            where: { userId: user.id },
        });
        const refreshToken = await this.getRefreshToken(user.id, res);
        return { accessToken, refreshToken };
    }
    async registration(userDto) {
        const { password, ...userWithoutConfirmedPassword } = userDto;
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException({
                message: 'Пользователь с таким email уже существует',
                statusCode: 400,
                error: 'Bad Request',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await this.userService.createUser({
            ...userWithoutConfirmedPassword,
            password: hashPassword,
        });
        return user;
    }
    async generateAccessToken(user) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async getRefreshToken(id, res) {
        const token = {
            token: crypto.randomUUID(),
            exp: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        };
        const refreshToken = await this.prisma.refreshTokens.create({
            data: { ...token, userId: id },
        });
        res.clearCookie('refreshToken');
        res.cookie('refreshToken', token.token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
        });
        return { refreshToken };
    }
    async validateUser(userDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'Такого пользователя не существует',
            });
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({
            message: 'Некорректный имейл или пароль',
        });
    }
    async refreshTokens(tokenInfo, res) {
        if (!tokenInfo) {
            throw new common_1.UnauthorizedException('Нужен рефреш токен');
        }
        const token = tokenInfo.token;
        const tokenData = await this.prisma.refreshTokens.findFirst({
            where: { token },
        });
        if (!tokenData || tokenData.exp < new Date()) {
            throw new common_1.UnauthorizedException('Не валидный рефреш токен');
        }
        await this.prisma.refreshTokens.delete({
            where: { id: tokenData.id },
        });
        const user = await this.userService.getUserId(tokenData.userId);
        const newAccessToken = await this.generateAccessToken(user);
        const newRefreshToken = await this.getRefreshToken(user.id, res);
        return { newAccessToken, newRefreshToken };
    }
    async logout(tokenInfo, res) {
        const token = tokenInfo.token;
        const tokenData = await this.prisma.refreshTokens.findFirst({
            where: { token: token },
        });
        await this.prisma.refreshTokens.delete({
            where: { id: tokenData.id },
        });
        res.clearCookie('refreshToken');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        common_2.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map