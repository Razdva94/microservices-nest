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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const task_project_razdva1994_1 = require("task-project-razdva1994");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(dto) {
        const user = await this.prisma.users.create({
            data: dto,
        });
        return user;
    }
    async getAllUsers() {
        const users = await this.prisma.users.findMany();
        return users;
    }
    async getUserId(id) {
        const user = await this.prisma.users.findUnique({
            where: { id: Number(id) },
        });
        return user;
    }
    async deleteUserById(id) {
        return this.prisma.users.delete({
            where: { id: Number(id) },
        });
    }
    async delete() {
        await this.prisma.users.deleteMany({});
    }
    async updateUser(id, updateUserDto) {
        const updatedUser = this.prisma.users.update({
            where: { id: Number(id) },
            data: { ...updateUserDto },
        });
        return updatedUser;
    }
    async getUserByEmail(email) {
        const user = await this.prisma.users.findUnique({
            where: { email },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_project_razdva1994_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map