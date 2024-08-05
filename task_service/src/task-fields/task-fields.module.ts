import { forwardRef, Module } from '@nestjs/common';
import { TaskFieldsController } from './task-fields.controller';
import { TaskFieldsService } from './task-fields.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from '@task-project/common';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService, PrismaService],
})
export class TaskFieldsModule {}
