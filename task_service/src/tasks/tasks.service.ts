import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '@task-project/common';
import { RequestWithUserId } from '@task-project/common';
import { Action } from 'src/enums/enums';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Injectable()
class TasksService {
  constructor(
    private prisma: PrismaService,
    private rabbitService: RabbitService,
  ) {}
  async moveTaskToOtherColumn(
    id: number,
    oldPosition: number,
    newPosition: number,
    projectId: number,
    newColumnId: number,
    req: RequestWithUserId,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;

    // Вызов вспомогательного метода для проверки
    await this.validateUserProject(userId, projectId, Action.Переместить);

    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
        position: oldPosition,
      },
    });
    if (!task) {
      throw new BadRequestException('Задача не найдена');
    }
    const newColumn = await this.prisma.columns.findFirst({
      where: {
        id: newColumnId,
        projectId,
      },
    });
    if (!newColumn) {
      throw new BadRequestException('Колонка не найдена');
    }

    const oldColumn = await this.prisma.columns.findFirst({
      where: {
        id: task.columnId,
        projectId,
      },
    });
    if (!oldColumn) {
      throw new BadRequestException('Колонка не найдена');
    }
    if (oldColumn.projectId !== projectId) {
      throw new BadRequestException('Вы не можете переместить эту задачу');
    }
    await this.prisma.tasks.updateMany({
      where: {
        columnId: oldColumn.id,
        position: {
          gte: oldPosition,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    });
    await this.prisma.tasks.updateMany({
      where: {
        columnId: newColumn.id,
        position: {
          gte: newPosition,
        },
      },
      data: {
        position: {
          increment: 1,
        },
      },
    });
    const newTask = await this.prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        columnId: newColumn.id,
        position: newPosition,
      },
    });
    return `Задача ${newTask.name} перемещена c ${oldPosition} на ${newPosition} позицию в колонку ${newColumn.name}`;
  }

  async moveTaskWithinColumn(
    id: number,
    oldPosition: number,
    newPosition: number,
    projectId: number,
    req: RequestWithUserId,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Переместить);
    const task = await this.prisma.tasks.findFirst({
      where: {
        id: id,
        position: oldPosition,
      },
    });
    if (!task) {
      throw new BadRequestException('Задача не найдена');
    }

    const column = await this.prisma.columns.findFirst({
      where: {
        id: task.columnId,
      },
    });
    if (!column) {
      throw new BadRequestException('Колонка не найдена');
    }
    if (column.projectId !== projectId) {
      throw new BadRequestException(
        'Вы не можете переместить задачу в эту колонку',
      );
    }
    if (oldPosition === newPosition) {
      return task;
    }
    if (newPosition > oldPosition) {
      await this.prisma.tasks.updateMany({
        where: {
          columnId: column.id,
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
      await this.prisma.tasks.updateMany({
        where: {
          columnId: column.id,
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
    const newTask = await this.prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        position: newPosition,
      },
    });
    return `Задача ${newTask.name} перемещена c ${oldPosition} на ${newPosition} позицию в колонке ${column.name}`;
  }

  async createTask(
    dto: CreateTaskDto,
    req: RequestWithUserId,
    projectId: number,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Создать);
    const column = await this.prisma.columns.findFirst({
      where: {
        id: dto.columnId,
        projectId: projectId,
      },
    });

    if (!column) {
      throw new BadRequestException(
        'Вы не можете создать задачу в эту колонку',
      );
    }

    //находим позицию
    const maxPosition = await this.prisma.tasks.aggregate({
      _max: {
        position: true,
      },
      where: {
        columnId: dto.columnId,
        projectId: projectId,
      },
    });

    const maxPosValue = maxPosition._max.position;
    const position: number = maxPosValue !== null ? maxPosValue + 1 : 1;

    const task = await this.prisma.tasks.create({
      data: {
        ...dto,
        position,
        projectId,
      },
    });
    return task;
  }
  async updateTask(
    dto: UpdateTaskDto,
    id: number,
    req: RequestWithUserId,
    projectId: number,
  ) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Редактировать);

    const task = await this.prisma.tasks.update({
      where: {
        id: id,
      },
      data: { ...dto },
    });

    return task;
  }
  async deleteTask(id: number, req: RequestWithUserId, projectId: number) {
    const userInfo: { id: number } = await this.rabbitService.sendToken(req);
    const userId: number = userInfo?.id;
    await this.validateUserProject(userId, projectId, Action.Удалить);

    // Находим удаляемую задачу, чтобы определить ее колонку
    const taskToDelete = await this.prisma.tasks.findUnique({
      where: { id: id },
    });

    if (!taskToDelete) {
      throw new BadRequestException('Задача не найдена');
    }

    const columnId = taskToDelete.columnId;

    // Удаление задачи
    await this.prisma.tasks.delete({
      where: { id: Number(id) },
    });

    // Удаление полей задачи, если они пусты
    const orphanedFields = await this.prisma.taskField.findMany({
      where: {
        OR: [
          { stringValues: { none: {} } },
          { numberValues: { none: {} } },
          { enumValues: { none: {} } },
        ],
      },
    });

    for (const field of orphanedFields) {
      await this.prisma.taskField.delete({
        where: { id: field.id },
      });
    }

    // Находим все задачи в той же колонке, что и удаляемая задача, и обновляем позиции
    const tasksInColumn = await this.prisma.tasks.findMany({
      where: { columnId: columnId },
      orderBy: { position: 'asc' },
    });

    for (let i = 0; i < tasksInColumn.length; i++) {
      await this.prisma.tasks.update({
        where: { id: tasksInColumn[i].id },
        data: { position: i + 1 },
      });
    }

    return { message: 'Задача успешно удалена и позиции обновлены' };
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
        `Вы не можете ${Action[action].toLowerCase()} задачу в этом проекте`,
      );
    }
  }
}
export { TasksService };
