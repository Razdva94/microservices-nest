import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NextFunction } from 'express';
import { Response } from 'express';
declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto, next: NextFunction, res: Response): Promise<void>;
    getAll(next: NextFunction, res: Response): Promise<void>;
    getById(id: number, next: NextFunction, res: Response): Promise<void>;
    deleteById(id: number, next: NextFunction, res: Response): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto, next: NextFunction, res: Response): Promise<void>;
    delete(next: NextFunction, res: Response): Promise<void>;
}
export { UsersController };
