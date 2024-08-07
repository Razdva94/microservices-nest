import { TaskFieldsService } from './task-fields.service';
import { RequestWithUserId } from '@task-project/common';
import { NextFunction, Response } from 'express';
import { CreateTaskFieldDto } from './dto/create-task-filed.dto';
export declare class TaskFieldsController {
    private taskFieldsService;
    constructor(taskFieldsService: TaskFieldsService);
    createTaskField(taskFieldDto: CreateTaskFieldDto, next: NextFunction, res: Response, req: RequestWithUserId, taskId: string): Promise<void>;
    updateTaskField(taskFieldDto: CreateTaskFieldDto, next: NextFunction, res: Response, req: RequestWithUserId, taskId: string, taskFieldId: string): Promise<void>;
    deleteTaskField(next: NextFunction, res: Response, req: RequestWithUserId, taskId: string, taskFieldId: string): Promise<void>;
}
