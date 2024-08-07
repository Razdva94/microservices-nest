import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@task-project/common';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';
import { ProjectsModule } from './projects/projects.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitService } from './rabbit/rabbit.service';

@Module({
  providers: [PrismaService, RabbitService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_service_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TasksModule,
    ColumnsModule,
    ProjectsModule,
    TaskFieldsModule,
  ],
})
export class AppModule {}
