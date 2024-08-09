import { Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { PrismaService } from '@task-project/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [TaskFieldsController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_INFO_TRANSPORT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_service_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  providers: [TaskFieldsService, PrismaService, RabbitService],
})
export class TaskFieldsModule {}
