import { AuthService } from './auth/auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'task-project-razdva1994';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RabbitService } from './rabbit/rabbit.service';
import { AppController } from './rabbit/rabbit.controller';

@Module({
  controllers: [AuthController, UsersController, AppController],
  providers: [PrismaService, AuthService, RabbitService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
