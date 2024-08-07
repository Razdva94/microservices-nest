import { Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { PrismaService } from '@task-project/common';

@Module({
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService, PrismaService],
})
export class TaskFieldsModule {}
