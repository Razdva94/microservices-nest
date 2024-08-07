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
import {
  ValidationPipe,
  RequestWithUserId,
  CustomError,
} from '@task-project/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { NextFunction } from 'express';
import { Response } from 'express';
import { UpdateColumnDto } from './dto/update-column.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Колонки')
@Controller('columns')
class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Создание колонки' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат созданной колонки',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createColumn(
    @Body() columnDto: CreateColumnDto,
    @Req() req: RequestWithUserId,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    const projectId = req.query.projectId;
    try {
      const column = await this.columnsService.createColumn(
        columnDto,
        req,
        Number(projectId),
      );
      res.send(column);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Колонка',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Обновление данных колонки по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор колонки' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат обновленной колонки',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  async updateColumn(
    @Param('id') id: string,
    @Body() ColumnDto: UpdateColumnDto,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const projectId = req.query.projectId;
    try {
      const column = await this.columnsService.updateColumn(
        ColumnDto,
        id,
        req,
        Number(projectId),
      );
      res.send(column);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Колонка',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Удаление колонки по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор колонки' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по удаленной колонке',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async deleteColumn(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    const projectId = req.query.projectId;
    try {
      const column = await this.columnsService.deleteColumn(
        id,
        req,
        Number(projectId),
      );
      res.send(column);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Колонка',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Перемещение колонки' })
  @ApiParam({ name: 'id', description: 'Идентификатор колонки' })
  @ApiQuery({ name: 'oldPosition', description: 'Изначальная позиция' })
  @ApiQuery({ name: 'newPosition', description: 'Новая позиция' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Информация по колонке и новой позиции',
  })
  @ApiQuery({ name: 'projectId', description: 'Идентификатор проекта' })
  @Patch('/move/:id')
  @UsePipes(ValidationPipe)
  async moveColumn(
    @Param('id') id: string,
    @Req() req: RequestWithUserId,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const projectId = req.query.projectId;
      const oldPosition = req.query.oldPosition;
      const newPosition = req.query.newPosition;

      const task = await this.columnsService.moveColumn(
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
        name: 'Колонка',
      };
      next(customError);
    }
  }
}

export { ColumnsController };
