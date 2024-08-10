import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaService } from 'task-project-razdva1994';
import { RabbitService } from 'src/rabbit/rabbit.service';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_INFO_TRANSPORT',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBIT_SERVICE_DOCKER}`],
          queue: 'auth_service_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, RabbitService],
})
export class ProjectsModule {}
