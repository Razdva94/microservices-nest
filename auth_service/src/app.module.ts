import { AuthService } from './auth/auth.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@task-project/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { RabbitService } from './rabbit/rabbit.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './rabbit/rabbit.controller';
// import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController, UsersController, AppController],
  providers: [PrismaService, AuthService, RabbitService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_service_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
