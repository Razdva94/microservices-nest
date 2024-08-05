/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { PrismaService } from '@task-project/common';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Response } from 'express';
import { RefreshToken } from './token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(userDto: LoginUserDto, res: Response) {
    const user = await this.validateUser(userDto);
    const accessToken = await this.generateAccessToken(user);
    await this.prisma.refreshTokens.deleteMany({
      where: { userId: user.id },
    });
    const refreshToken = await this.getRefreshToken(user.id, res);
    return { accessToken, refreshToken };
  }

  async registration(userDto: CreateUserDto) {
    const { password, ...userWithoutConfirmedPassword } = userDto;
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        {
          message: 'Пользователь с таким email уже существует',
          statusCode: 400,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await this.userService.createUser({
      ...userWithoutConfirmedPassword,
      password: hashPassword,
    });
    return user;
  }

  private async generateAccessToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async getRefreshToken(id: number, res: Response) {
    const token = {
      token: crypto.randomUUID(),
      exp: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    };
    const refreshToken = await this.prisma.refreshTokens.create({
      data: { ...token, userId: id },
    });
    res.clearCookie('refreshToken');
    res.cookie('refreshToken', token.token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    return { refreshToken };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Такого пользователя не существует',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный имейл или пароль',
    });
  }

  async refreshTokens(tokenInfo: RefreshToken, res: Response) {
    if (!tokenInfo) {
      throw new UnauthorizedException('Нужен рефреш токен');
    }
    const token = tokenInfo.token;

    const tokenData = await this.prisma.refreshTokens.findFirst({
      where: { token },
    });

    if (!tokenData || tokenData.exp < new Date()) {
      throw new UnauthorizedException('Не валидный рефреш токен');
    }
    await this.prisma.refreshTokens.delete({
      where: { id: tokenData.id },
    });

    const user = await this.userService.getUserId(tokenData.userId);
    const newAccessToken = await this.generateAccessToken(user);
    const newRefreshToken = await this.getRefreshToken(user.id, res);

    return { newAccessToken, newRefreshToken };
  }

  async logout(tokenInfo: RefreshToken, res: Response) {
    const token = tokenInfo.token;
    const tokenData = await this.prisma.refreshTokens.findFirst({
      where: { token: token },
    });
    await this.prisma.refreshTokens.delete({
      where: { id: tokenData.id },
    });
    res.clearCookie('refreshToken');
  }
}
