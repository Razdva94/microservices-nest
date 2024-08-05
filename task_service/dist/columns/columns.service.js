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
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const enums_1 = require("../enums/enums");
let ColumnsService = class ColumnsService {
    async moveColumn(id, oldPosition, newPosition, projectId, req) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Переместить);
        const column = await this.prisma.columns.findFirst({
            where: {
                id: id,
                position: oldPosition,
            },
        });
        if (!column) {
            throw new common_1.BadRequestException('Колонка не найдена');
        }
        if (column.projectId !== projectId) {
            throw new common_1.BadRequestException('Вы не можете переместить эту колонку');
        }
        if (oldPosition === newPosition) {
            return column;
        }
        if (newPosition > oldPosition) {
            await this.prisma.columns.updateMany({
                where: {
                    projectId: projectId,
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
            await this.prisma.columns.updateMany({
                where: {
                    projectId: projectId,
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
        const newColumn = await this.prisma.columns.update({
            where: {
                id: id,
            },
            data: {
                position: newPosition,
            },
        });
        return `Задача ${newColumn.name} перемещена c ${oldPosition} на ${newPosition} позицию`;
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createColumn(dto, req, projectId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Создать);
        const maxPosition = await this.prisma.columns.aggregate({
            _max: {
                position: true,
            },
            where: {
                projectId: Number(projectId),
            },
        });
        const maxPosValue = maxPosition._max.position;
        const position = maxPosValue !== null ? maxPosValue + 1 : 1;
        const column = await this.prisma.columns.create({
            data: {
                ...dto,
                position,
                projectId,
            },
        });
        return column;
    }
    async updateColumn(dto, id, req, projectId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Редактировать);
        const column = await this.prisma.columns.update({
            where: {
                id: Number(id),
            },
            data: { ...dto },
        });
        return column;
    }
    async deleteColumn(id, req, projectId) {
        const userId = req?.user?.id;
        await this.validateUserProject(userId, projectId, enums_1.Action.Удалить);
        const columnToDelete = await this.prisma.columns.findUnique({
            where: { id: Number(id) },
        });
        if (!columnToDelete) {
            throw new common_1.BadRequestException('Колонка не найдена');
        }
        await this.prisma.columns.delete({
            where: { id: Number(id) },
        });
        const columnInProject = await this.prisma.columns.findMany({
            where: { projectId: projectId },
            orderBy: { position: 'asc' },
        });
        for (let i = 0; i < columnInProject.length; i++) {
            await this.prisma.columns.update({
                where: { id: columnInProject[i].id },
                data: { position: i + 1 },
            });
        }
        return { message: 'Колонка успешно удалена и позиции обновлены' };
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
            throw new common_1.BadRequestException(`Вы не можете ${enums_1.Action[action].toLowerCase()} колонку в этом проекте`);
        }
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map