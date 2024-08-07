import { Controller, Next, Put, Req, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe, CustomError } from '@task-project/common';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { NextFunction, Response, Request } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiCreatedResponse({
    description: 'Возврат токенов(access и refresh)',
  })
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() userDto: LoginUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.authService.login(userDto, res);
      res.send(result);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiCreatedResponse({
    description: 'Возврат нового пользователя',
  })
  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.authService.registration(userDto);
      res.send(result);
    } catch (error) {
      const customError = error as CustomError;
      customError.options = {
        name: 'Пользователь',
      };
      next(customError);
    }
  }

  //* Запрос на обновление приходит с клиента refreshToken храниться в куках и базе
  //* При запросе происходит проверка валидности refreshToken через базу
  //* Если refreshToken валиден, то происходит обновление accessToken и refreshToken в базе

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiCreatedResponse({
    description: 'Возврат новых токенов(access и refresh)',
  })
  @ApiBearerAuth('access-token')
  @Put('/refresh-token')
  async refreshTokens(@Res() res: Response, @Req() req: Request) {
    const tokenInfo = req.cookies.refreshToken;
    const result = await this.authService.refreshTokens(tokenInfo, res);
    return res.send(result);
  }

  @ApiOperation({ summary: 'Выход из аккаунта' })
  @ApiCreatedResponse({
    description: 'Сообщение о выходе из аккаунта',
  })
  @ApiBearerAuth('access-token')
  @Post('/logout')
  async logout(@Res() res: Response, req: Request) {
    const tokenInfo = req.cookies.refreshToken;
    await this.authService.logout(tokenInfo, res);
    return res.send({ message: 'Logout successful' });
  }
}
