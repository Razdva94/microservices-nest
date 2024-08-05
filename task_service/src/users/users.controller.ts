import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Next,
  Res,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@task-project/common';
import {
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NextFunction } from 'express';
import { Response } from 'express';
import { CustomError } from 'src/types/types';

@ApiTags('Пользователи')
@Controller('users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат созданного пользователя',
  })
  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Body() userDto: CreateUserDto,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.createUser(userDto);
      res.send(user);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат всех пользователей',
  })
  @Get('/receive-all')
  @UseGuards(JwtAuthGuard)
  async getAll(@Next() next: NextFunction, @Res() res: Response) {
    try {
      const user = await this.usersService.getAllUsers();
      res.send(user);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Получение пользователя по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат пользователя по id',
  })
  @Get('receive/:id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id') id: number,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.getUserId(id);
      res.send(user);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Удаление пользователя по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат удаленного пользователя',
  })
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(
    @Param('id') id: number,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const userId = await this.usersService.deleteUserById(id);
      res.send({ message: `User ${userId} deleted successfully` });
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Обновление данных пользователя по идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор пользователя' })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Возврат обновленного пользователя',
  })
  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Next() next: NextFunction,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.updateUser(id, updateUserDto);
      res.send(user);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Удаление всех пользователей' })
  @ApiBearerAuth('access-token')
  @Delete('/delete-all')
  @ApiCreatedResponse({
    description: 'Сообщение о удалении всех пользователей',
  })
  @UseGuards(JwtAuthGuard)
  async delete(@Next() next: NextFunction, @Res() res: Response) {
    try {
      await this.usersService.delete();
      res.send({ message: `Все пользователи удалены` });
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }
}

export { UsersController };
