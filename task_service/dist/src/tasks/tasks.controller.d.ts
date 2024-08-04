import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { NextFunction, Response } from 'express';
import { RequestWithUserId } from 'src/types/types';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(taskDto: CreateTaskDto, next: NextFunction, res: Response, req: RequestWithUserId): Promise<void>;
    updateTask(id: string, taskDto: UpdateTaskDto, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    moveTaskWithinColumn(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    moveTaskToOtherColumn(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    deleteTask(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
}
