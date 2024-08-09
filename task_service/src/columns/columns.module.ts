import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { PrismaService } from '@task-project/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from 'src/rabbit/rabbit.service';

@Module({
  controllers: [ColumnsController],
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
  providers: [ColumnsService, PrismaService, RabbitService],
})
export class ColumnsModule {}
