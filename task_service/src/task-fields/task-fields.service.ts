import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskFieldDto } from './dto/create-task-filed.dto';
import { UpdateTaskFieldDto } from './dto/update-task-field.dto';
import { FieldType, TaskFieldEnumOptions } from '@prisma/client';
import { RequestWithUserId } from 'src/types/types';
import { Action } from 'src/enums/enums';

interface IFindOrCreateExtra {
  skipCreation?: boolean;
}

interface ITaskField {
  id: number;
  name: string;
  type: FieldType;
}

interface ITaskFieldValue {
  taskId: number;
  taskFieldId: number;
  value: string | number | TaskFieldEnumOptions;
}

enum TaskFieldName {
  ENUM = 'TaskFieldValueEnum',
  NUMBER = 'TaskFieldValueNumber',
  STRING = 'TaskFieldValueString',
}

@Injectable()
export class TaskFieldsService {
  constructor(private prisma: PrismaService) {}

  async updateTaskField(
    taskFieldDto: UpdateTaskFieldDto,
    req: RequestWithUserId,
    projectId: number,
    taskId: number,
    taskFieldId: number,
  ) {
    const userId = req?.user?.id;
    await this.validateUserProject(userId, projectId, Action.Редактировать);
    const taskField = await this.prisma.taskField.findFirst({
      where: {
        id: taskFieldId,
      },
    });
    const oldFieldType = taskField.type;
    const { value } = taskFieldDto;

    // Определяем тип поля
    const fieldType: FieldType = this.determineFieldType(value);

    const updatedTaskField = await this.prisma.taskField.update({
      where: {
        id: taskFieldId,
      },
      data: {
        name: taskFieldDto.name,
        type: fieldType,
      },
    });
    let taskFieldValue: ITaskFieldValue;
    if (oldFieldType === updatedTaskField.type) {
      taskFieldValue = await this.prisma[
        TaskFieldName[updatedTaskField.type]
      ].update({
        where: {
          taskId_taskFieldId: {
            taskId,
            taskFieldId,
          },
        },
        data: {
          value: { set: value },
        },
      });
    } else {
      await this.prisma[TaskFieldName[oldFieldType]].delete({
        where: {
          taskId_taskFieldId: {
            taskId,
            taskFieldId,
          },
        },
      });
      taskFieldValue = await this.createTaskFieldValue(
        value,
        taskField.id,
        taskId,
        fieldType,
      );
    }
    return { updatedTaskField, taskFieldValue };
  }

  async createTaskField(
    taskFieldDto: CreateTaskFieldDto,
    req: RequestWithUserId,
    projectId: number,
    taskId: number,
  ) {
    const userId = req?.user?.id;
    await this.validateUserProject(userId, projectId, Action.Создать);

    const { value } = taskFieldDto;

    // Определяем тип поля
    const fieldType = this.determineFieldType(value);

    // Находим или создаем taskField
    const taskField: ITaskField = await this.findOrCreateTaskField(
      taskFieldDto.name,
      fieldType,
    );

    await this.createTaskFieldValue(value, taskField.id, taskId, fieldType);
    // В зависимости от типа значения создаем соответствующее значение для taskField

    return taskFieldDto;
  }

  async deleteTaskField(
    req: RequestWithUserId,
    projectId: number,
    taskFieldId: number,
  ) {
    const userId = req?.user?.id;
    await this.validateUserProject(userId, projectId, Action.Удалить);
    return await this.prisma.taskField.delete({
      where: {
        id: taskFieldId,
      },
    });
  }

  private determineFieldType(
    value: string | number | TaskFieldEnumOptions,
  ): FieldType {
    if (typeof value === 'string') {
      if (
        Object.values(TaskFieldEnumOptions).includes(
          value as TaskFieldEnumOptions,
        )
      ) {
        return FieldType.ENUM;
      }
      return FieldType.STRING;
    } else if (typeof value === 'number') {
      return FieldType.NUMBER;
    }
    throw new BadRequestException('Невалидное значение для поля value');
  }

  private async findOrCreateTaskField(
    name: string,
    type: FieldType,
    extra: IFindOrCreateExtra = { skipCreation: false },
  ) {
    let taskField = await this.prisma.taskField.findFirst({
      where: {
        name,
        type,
      },
    });

    if (!extra.skipCreation) {
      if (!taskField) {
        taskField = await this.prisma.taskField.create({
          data: {
            name,
            type,
          },
        });
      }
    }

    if (!taskField) {
      throw new BadRequestException('Поле задачи не найдено');
    }
    return taskField;
  }

  private async createTaskFieldValue(
    value: string | number | TaskFieldEnumOptions,
    taskFieldId: number,
    taskId: number,
    fieldType: FieldType,
  ) {
    let modelName: string;

    if (fieldType === 'ENUM') {
      modelName = TaskFieldName.ENUM;
    } else if (fieldType === 'NUMBER') {
      modelName = TaskFieldName.NUMBER;
    } else if (fieldType === 'STRING') {
      modelName = TaskFieldName.STRING;
    } else {
      throw new BadRequestException('Невалидное значение для типа поля');
    }

    return await this.prisma[modelName].create({
      data: {
        value,
        taskFieldId,
        taskId,
      },
    });
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
