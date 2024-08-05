import { CreateColumnDto } from './dto/create-column.dto';
import { RequestWithUserId } from 'src/types/types';
import { UpdateColumnDto } from './dto/update-column.dto';
import { PrismaService } from 'src/prisma.service';
declare class ColumnsService {
    private prisma;
    moveColumn(id: number, oldPosition: number, newPosition: number, projectId: number, req: RequestWithUserId): Promise<string | {
        id: number;
        name: string;
        position: number;
        projectId: number;
    }>;
    constructor(prisma: PrismaService);
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
