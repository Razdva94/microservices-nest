import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService, RequestWithUserId } from 'task-project-razdva1994';
import { Action } from 'src/enums/enums';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
class ColumnsService {
  constructor(
    private prisma: PrismaService,
    private rabbitService: RabbitService,
  ) {}
  async moveColumn(
    id: number,
    oldPosition: number,
    newPosition: number,
    projectId: number,
    req: RequestWithUserId,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Переместить);
    const column = await this.prisma.columns.findFirst({
      where: {
        id: id,
        position: oldPosition,
      },
    });
    if (!column) {
      throw new BadRequestException('Колонка не найдена');
    }
    if (column.projectId !== projectId) {
      throw new BadRequestException('Вы не можете переместить эту колонку');
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
    } else {
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
  async createColumn(
    dto: CreateColumnDto,
    req: RequestWithUserId,
    projectId: number,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Создать);

    //находим позицию
    const maxPosition = await this.prisma.columns.aggregate({
      _max: {
        position: true,
      },
      where: {
        projectId: Number(projectId),
      },
    });

    const maxPosValue = maxPosition._max.position;
    const position: number = maxPosValue !== null ? maxPosValue + 1 : 1;

    const column = await this.prisma.columns.create({
      data: {
        ...dto,
        position,
        projectId,
      },
    });
    return column;
  }
  async updateColumn(
    dto: UpdateColumnDto,
    id: string,
    req: RequestWithUserId,
    projectId: number,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Редактировать);

    const column = await this.prisma.columns.update({
      where: {
        id: Number(id),
      },
      data: { ...dto },
    });

    return column;
  }

  async deleteColumn(id: string, req: RequestWithUserId, projectId: number) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Удалить);

    // Находим удаляемую колонку, чтобы определить ее проект
    const columnToDelete = await this.prisma.columns.findUnique({
      where: { id: Number(id) },
    });

    if (!columnToDelete) {
      throw new BadRequestException('Колонка не найдена');
    }

    // Удаление колонки
    await this.prisma.columns.delete({
      where: { id: Number(id) },
    });

    // Находим все колонки в проекте, где и удаляемая колонка, и обновляем позиции
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

  private async validateUserProject(
    userId: number,
    projectId: number,
    action: Action,
  ): Promise<void> {
    if (userId === undefined) {
      throw new BadRequestException('Пользователь не найден');
    }

    const project = await this.prisma.projects.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      throw new BadRequestException(
        `Вы не можете ${Action[action].toLowerCase()} колонку в этом проекте`,
      );
    }
  }
}

export { ColumnsService };
