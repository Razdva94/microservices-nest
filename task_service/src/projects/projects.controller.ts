import {
  Body,
  Controller,
  Delete,
  Get,
  Next,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUserId } from 'src/types/types';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';
import { CustomError } from 'src/types/types';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Создание проекта' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат созданного проекта',
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createProject(
    @Body() projectDto: CreateProjectDto,
    @Req() req: RequestWithUserId,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const project = await this.projectsService.createProject(projectDto, req);
      res.send(project);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Проект',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Обновление данных проекта по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор проекта' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат обновленного проекта',
  })
  @Patch('/update/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateProject(
    @Param('id') id: string,
    @Body() ProjectDto: UpdateProjectDto,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const project = await this.projectsService.updateProject(
        ProjectDto,
        Number(id),
        req,
      );
      res.send(project);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Проект',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Удаление проекта по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор проекта' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по удаленному проекта',
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const project = await this.projectsService.deleteProject(Number(id), req);
      res.send(project);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Проект',
      };
      next(customError);
    }
  }
  @ApiOperation({
    summary: 'Получение информации по проектам принадлежащим пользователю',
  })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по проектам пользователя',
  })
  @Get('/receive')
  @UseGuards(JwtAuthGuard)
  async getProjects(
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const projects = await this.projectsService.getProjects(req);
      res.send(projects);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Проект',
      };
      next(customError);
    }
  }
}
