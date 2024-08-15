import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { NextFunction, Response, Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginUserDto, res: Response, next: NextFunction): Promise<void>;
    registration(userDto: CreateUserDto, res: Response, next: NextFunction): Promise<void>;
    refreshTokens(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    logout(res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
}
