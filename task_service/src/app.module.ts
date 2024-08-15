import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'task-project-razdva1994';
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
        name: 'USER_INFO_TRANSPORT',
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RABBIT_SERVICE_DOCKER}`],
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
