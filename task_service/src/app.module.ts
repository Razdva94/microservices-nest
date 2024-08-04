import { AuthService } from './auth/auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';
import { ProjectsModule } from './projects/projects.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, PrismaService, AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ColumnsModule,
    ProjectsModule,
    TaskFieldsModule,
  ],
})
export class AppModule {}
