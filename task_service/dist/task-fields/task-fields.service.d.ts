import { PrismaService } from '@task-project/common';
import { CreateTaskFieldDto } from './dto/create-task-filed.dto';
import { UpdateTaskFieldDto } from './dto/update-task-field.dto';
import { TaskFieldEnumOptions } from '@prisma/client';
import { RequestWithUserId } from 'src/types/types';
interface ITaskFieldValue {
    taskId: number;
    taskFieldId: number;
    value: string | number | TaskFieldEnumOptions;
}
export declare class TaskFieldsService {
    private prisma;
    constructor(prisma: PrismaService);
    updateTaskField(taskFieldDto: UpdateTaskFieldDto, req: RequestWithUserId, projectId: number, taskId: number, taskFieldId: number): Promise<{
        updatedTaskField: {
            id: number;
            name: string;
            type: import("@prisma/client").$Enums.FieldType;
        };
        taskFieldValue: ITaskFieldValue;
    }>;
    createTaskField(taskFieldDto: CreateTaskFieldDto, req: RequestWithUserId, projectId: number, taskId: number): Promise<CreateTaskFieldDto>;
    deleteTaskField(req: RequestWithUserId, projectId: number, taskFieldId: number): Promise<{
        id: number;
        name: string;
        type: import("@prisma/client").$Enums.FieldType;
    }>;
    private determineFieldType;
    private findOrCreateTaskField;
    private createTaskFieldValue;
    private validateUserProject;
}
export {};
