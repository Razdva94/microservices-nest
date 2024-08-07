import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService, RequestWithUserId } from '@task-project/common';
import { Projects } from '@prisma/client';
import { RabbitService } from 'src/rabbit/rabbit.service';

interface Itasks {
  id: number;
  columnId: number;
  projectId: number;
  name: string;
  description: string | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}
interface ItasksArray {
  tasks: Itasks[];
}

enum TaskFieldValueType {
  ENUM = 'TaskFieldValueEnum',
  NUMBER = 'TaskFieldValueNumber',
  STRING = 'TaskFieldValueString',
}
@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private rabbitService: RabbitService,
  ) {}
  async getProjects(req: RequestWithUserId) {
    await this.rabbitService.sendToken(req);
    const userId: number = req?.user?.id;
    if (userId === undefined) {
      throw new BadRequestException('Пользователь не найден');
    }

    const projects = await this.prisma.projects.findMany({
      where: {
        userId: userId,
      },
    });

    const columns = await this.prisma.columns.findMany({
      where: {
        projectId: {
          in: projects.map((project) => project.id),
        },
      },
    });

    const tasks = await this.prisma.tasks.findMany({
      where: {
        columnId: {
          in: columns.map((column) => column.id),
        },
      },
    });

    const findTaskFieldValue = async (
      taskFieldValueType: TaskFieldValueType,
      tasks: ItasksArray['tasks'],
    ) => {
      const taskfield = await this.prisma[`${taskFieldValueType}`].findMany({
        where: {
          taskId: {
            in: tasks.map((task) => task.id),
          },
        },
      });
      return taskfield;
    };

    const taskFieldValueNumber = await findTaskFieldValue(
      TaskFieldValueType.NUMBER,
      tasks,
    );
    const taskFieldValueString = await findTaskFieldValue(
      TaskFieldValueType.STRING,
      tasks,
    );
    const taskFieldValueEnum = await findTaskFieldValue(
      TaskFieldValueType.ENUM,
      tasks,
    );

    const taskFields = await this.prisma.taskField.findMany({
      where: {
        id: {
          in: [
            ...taskFieldValueString.map(
              (taskFieldValue: { taskFieldId: number }) =>
                taskFieldValue.taskFieldId,
            ),
            ...taskFieldValueNumber.map(
              (taskFieldValue: { taskFieldId: number }) =>
                taskFieldValue.taskFieldId,
            ),
            ...taskFieldValueEnum.map(
              (taskFieldValue: { taskFieldId: number }) =>
                taskFieldValue.taskFieldId,
            ),
          ],
        },
      },
    });

    const projectEntities = projects.map((project) => {
      const columnEntities = columns
        .filter((column) => column.projectId === project.id)
        .map((column) => {
          const taskEntities = tasks
            .filter((task) => task.columnId === column.id)
            .map((task) => {
              const taskFieldValueEntities = [
                ...taskFieldValueString.filter(
                  (taskFieldValue: { taskId: number }) =>
                    taskFieldValue.taskId === task.id,
                ),
                ...taskFieldValueNumber.filter(
                  (taskFieldValue: { taskId: number }) =>
                    taskFieldValue.taskId === task.id,
                ),
                ...taskFieldValueEnum.filter(
                  (taskFieldValue: { taskId: number }) =>
                    taskFieldValue.taskId === task.id,
                ),
              ];
              const taskFieldIds = taskFieldValueEntities.map(
                (taskFieldValue: { taskFieldId: number }) => {
                  return taskFieldValue.taskFieldId;
                },
              );
              const taskFieldsFiltered = taskFields.filter((taskField) => {
                return taskFieldIds.includes(taskField.id);
              });

              const taskFieldEntities = [];
              for (let i = 0; i < taskFieldsFiltered.length; i++) {
                taskFieldEntities.push({
                  name: taskFieldsFiltered[i].name,
                  value: taskFieldValueEntities.find((entity) => {
                    return entity.taskFieldId === taskFieldsFiltered[i].id;
                  }).value,
                });
              }
              return {
                ...task,
                taskFields: taskFieldEntities,
              };
            });
          return { ...column, tasks: taskEntities };
        });
      return { ...project, columns: columnEntities };
    });

    const names = projectEntities.map((project) => project.name);
    return { names, projectEntities };
  }
  async createProject(dto: CreateProjectDto, req: RequestWithUserId) {
    const userId: number = req?.user?.id;
    if (userId === undefined) {
      throw new BadRequestException('Пользователь не найден');
    }
    const project = this.prisma.projects.create({
      data: {
        ...dto,
        userId,
      },
    });
    return project;
  }
  async deleteProject(id: number, req: RequestWithUserId) {
    const userId: number = req?.user?.id;
    if (userId === undefined) {
      throw new BadRequestException('Пользователь не найден');
    }

    const project = await this.prisma.projects.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return {
      message: `Проект ${project.name} удален со всеми задачами`,
    };
  }
  updateProject(
    ProjectDto: UpdateProjectDto,
    id: number,
    req: RequestWithUserId,
  ): Promise<Projects> {
    const userId: number = req?.user?.id;
    if (userId === undefined) {
      throw new BadRequestException('Пользователь не найден');
    }

    const project = this.prisma.projects.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        ...ProjectDto,
      },
    });
    return project;
  }
}
