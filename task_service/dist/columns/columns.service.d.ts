import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService, RequestWithUserId } from '@task-project/common';
import { RabbitService } from 'src/rabbit/rabbit.service';
declare class ColumnsService {
    private prisma;
    private rabbitService;
    constructor(prisma: PrismaService, rabbitService: RabbitService);
    moveColumn(id: number, oldPosition: number, newPosition: number, projectId: number, req: RequestWithUserId): Promise<string | {
        id: number;
        name: string;
        position: number;
        projectId: number;
    }>;
    createColumn(dto: CreateColumnDto, req: RequestWithUserId, projectId: number): Promise<{
        id: number;
        name: string;
        position: number;
        projectId: number;
    }>;
    updateColumn(dto: UpdateColumnDto, id: string, req: RequestWithUserId, projectId: number): Promise<{
        id: number;
        name: string;
        position: number;
        projectId: number;
    }>;
    deleteColumn(id: string, req: RequestWithUserId, projectId: number): Promise<{
        message: string;
    }>;
    private validateUserProject;
}
export { ColumnsService };
