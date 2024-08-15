import {
  Body,
  Controller,
  Delete,
  Next,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { TaskFieldsService } from './task-fields.service';
import { ValidationPipe } from 'task-project-razdva1994';
import { RequestWithUserId, CustomError } from 'task-project-razdva1994';
import { NextFunction, Response } from 'express';
import { CreateTaskFieldDto } from './dto/create-task-filed.dto';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Поля задач')
@Controller('task-fields/:taskId')
export class TaskFieldsController {
  constructor(private taskFieldsService: TaskFieldsService) {}

  @ApiOperation({ summary: 'Создание поля задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат созданного поля задачи',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @ApiParam({ name: 'taskId', description: 'Идентификатор задачи' })
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createTaskField(
    @Body() taskFieldDto: CreateTaskFieldDto,
    @Next() next: NextFunction,
    @Res() res: Response,
    @Req() req: RequestWithUserId,
    @Param('taskId') taskId: string,
  ) {
    const projectId = req.query.projectId;
    try {
      const taskField = await this.taskFieldsService.createTaskField(
        taskFieldDto,
        req,
        Number(projectId),
        Number(taskId),
      );
      res.send(taskField);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Поле задачи',
      };
      next(customError);
    }
  }
  @ApiOperation({ summary: 'Редактирование поля задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат редактированного поля задачи',
  })
  @ApiParam({ name: 'taskId', description: 'Идентификатор задачи' })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @ApiParam({ name: 'taskFieldId', description: 'Идентификатор поля' })
  @Patch('/update/:taskFieldId')
  @UsePipes(ValidationPipe)
  async updateTaskField(
    @Body() taskFieldDto: CreateTaskFieldDto,
    @Next() next: NextFunction,
    @Res() res: Response,
    @Req() req: RequestWithUserId,
    @Param('taskId') taskId: string,
    @Param('taskFieldId') taskFieldId: string,
  ) {
    const projectId = req.query.projectId;
    try {
      const taskField = await this.taskFieldsService.updateTaskField(
        taskFieldDto,
        req,
        Number(projectId),
        Number(taskId),
        Number(taskFieldId),
      );
      res.send(taskField);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Поле задачи',
      };
      next(customError);
    }
  }
  @ApiOperation({ summary: 'Удаление поля задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат удаленного поля задачи',
  })
  @ApiParam({ name: 'taskId', description: 'Идентификатор задачи' })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @ApiParam({ name: 'taskFieldId', description: 'Идентификатор поля' })
  @Delete('/delete/:taskFieldId')
  @UsePipes(ValidationPipe)
  async deleteTaskField(
    @Next() next: NextFunction,
    @Res() res: Response,
    @Req() req: RequestWithUserId,
    @Param('taskId') taskId: string,
    @Param('taskFieldId') taskFieldId: string,
  ) {
    const projectId = req.query.projectId;
    try {
      const taskField = await this.taskFieldsService.deleteTaskField(
        req,
        Number(projectId),
        Number(taskFieldId),
      );
      res.send(taskField);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Поле задачи',
      };
      next(customError);
    }
  }
}
