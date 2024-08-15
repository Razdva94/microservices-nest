import { Injectable } from '@nestjs/common';
import { PrismaService } from 'task-project-razdva1994';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.users.create({
      data: dto,
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.users.findMany();
    return users;
  }

  async getUserId(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(id) },
    });
    return user;
  }

  async deleteUserById(id: number) {
    return this.prisma.users.delete({
      where: { id: Number(id) },
    });
  }

  async delete() {
    await this.prisma.users.deleteMany({});
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.prisma.users.update({
      where: { id: Number(id) },
      data: { ...updateUserDto },
    });
    return updatedUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return user;
  }
}

export { UsersService };
