import { PrismaService } from 'src/prisma.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    getAllUsers(): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }[]>;
    getUserId(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    deleteUserById(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
    delete(): Promise<void>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    getUserByEmail(email: string): Promise<{
        id: number;
        name: string;
        email: string;
        password: string;
    }>;
}
export { UsersService };
