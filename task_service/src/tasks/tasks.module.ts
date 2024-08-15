import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from 'task-project-razdva1994';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [TasksController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_INFO_TRANSPORT',
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RABBIT_SERVICE_DOCKER}`],
          queue: 'auth_service_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [TasksService, PrismaService, RabbitService],
})
export class TasksModule {}
