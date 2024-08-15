import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from 'task-project-razdva1994';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Response } from 'express';
import { RefreshToken } from './token.model';
export declare class AuthService {
    private userService;
    private jwtService;
    private prisma;
    constructor(userService: UsersService, jwtService: JwtService, prisma: PrismaService);
    login(userDto: LoginUserDto, res: Response): Promise<{
        accessToken: {
            token: string;
        };
        refreshToken: {
            refreshToken: {
                id: number;
                userId: number;
                token: string;
                exp: Date;
            };
        };
    }>;
    registration(userDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    private generateAccessToken;
    private getRefreshToken;
    private validateUser;
    refreshTokens(tokenInfo: RefreshToken, res: Response): Promise<{
        newAccessToken: {
            token: string;
        };
        newRefreshToken: {
            refreshToken: {
                id: number;
                userId: number;
                token: string;
                exp: Date;
            };
        };
    }>;
    logout(tokenInfo: RefreshToken, res: Response): Promise<void>;
}
