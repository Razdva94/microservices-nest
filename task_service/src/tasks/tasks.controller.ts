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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { NextFunction, Response } from 'express';
import { ValidationPipe } from '@task-project/common';
import { CustomError, RequestWithUserId } from 'src/types/types';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат созданной задачи',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() taskDto: CreateTaskDto,
    @Next() next: NextFunction,
    @Res() res: Response,
    @Req() req: RequestWithUserId,
    //!@Query не работает, пришлось сделать через req??
    // @Query('projectId') projectId: string,
  ) {
    const projectId = req.query.projectId;
    try {
      const task = await this.tasksService.createTask(
        taskDto,
        req,
        Number(projectId),
      );
      res.send(task);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Задача',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Обновление данных задачи по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат обновленной задачи',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id') id: string,
    @Body() taskDto: UpdateTaskDto,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const projectId = req.query.projectId;
    try {
      const task = await this.tasksService.updateTask(
        taskDto,
        Number(id),
        req,
        Number(projectId),
      );
      res.send(task);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Задача',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Перемещение задачи в пределах колонки' })
  @ApiParam({ name: 'id', description: 'Идентификатор задачи' })
  @ApiQuery({ name: 'oldPosition', description: 'Изначальная позиция' })
  @ApiQuery({ name: 'newPosition', description: 'Новая позиция' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по задаче и новой позиции',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Patch('/move-within/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async moveTaskWithinColumn(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const projectId = req.query.projectId;
      const oldPosition = req.query.oldPosition;
      const newPosition = req.query.newPosition;

      const task = await this.tasksService.moveTaskWithinColumn(
        Number(id),
        Number(oldPosition),
        Number(newPosition),
        Number(projectId),
        req,
      );
      res.send(task);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Задача',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Перемещение задачи в другой колонку' })
  @ApiParam({ name: 'id', description: 'Идентификатор Задачи' })
  @ApiQuery({ name: 'newColumnId', description: 'Новая колонка' })
  @ApiQuery({ name: 'oldPosition', description: 'Изначальная позиция' })
  @ApiQuery({ name: 'newPosition', description: 'Новая позиция' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация оп задачи и новой позиции',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Patch('/move-outer/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async moveTaskToOtherColumn(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const newColumnId = req.query.newColumnId;
      const projectId = req.query.projectId;
      const oldPosition = req.query.oldPosition;
      const newPosition = req.query.newPosition;

      const task = await this.tasksService.moveTaskToOtherColumn(
        Number(id),
        Number(oldPosition),
        Number(newPosition),
        Number(projectId),
        Number(newColumnId),
        req,
      );
      res.send(task);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Задача',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiParam({ name: 'id', description: 'Идентификатор задачи' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по удаленной задачи',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const projectId = req.query.projectId;
    try {
      const task = await this.tasksService.deleteTask(
        Number(id),
        req,
        Number(projectId),
      );
      res.send(task);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Задача',
      };
      next(customError);
    }
  }
}
