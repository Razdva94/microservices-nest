import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { RequestWithUserId } from 'src/types/types';
declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    moveTaskToOtherColumn(id: number, oldPosition: number, newPosition: number, projectId: number, newColumnId: number, req: RequestWithUserId): Promise<string>;
    moveTaskWithinColumn(id: number, oldPosition: number, newPosition: number, projectId: number, req: RequestWithUserId): Promise<string | {
        id: number;
        columnId: number;
        projectId: number;
        name: string;
        description: string | null;
        position: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createTask(dto: CreateTaskDto, req: RequestWithUserId, projectId: number): Promise<{
        id: number;
        columnId: number;
        projectId: number;
        name: string;
        description: string | null;
        position: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateTask(dto: UpdateTaskDto, id: number, req: RequestWithUserId, projectId: number): Promise<{
        id: number;
        columnId: number;
        projectId: number;
        name: string;
        description: string | null;
        position: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteTask(id: number, req: RequestWithUserId, projectId: number): Promise<{
        message: string;
    }>;
    private validateUserProject;
}
export { TasksService };
