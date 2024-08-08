import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService, RequestWithUserId } from '@task-project/common';
import { Projects } from '@prisma/client';
import { RabbitService } from 'src/rabbit/rabbit.service';
export declare class ProjectsService {
    private prisma;
    private rabbitService;
    constructor(prisma: PrismaService, rabbitService: RabbitService);
    getProjects(req: RequestWithUserId): Promise<{
        names: string[];
        projectEntities: {
            columns: {
                tasks: {
                    taskFields: any[];
                    id: number;
                    columnId: number;
                    projectId: number;
                    name: string;
                    description: string | null;
                    position: number;
                    createdAt: Date;
                    updatedAt: Date;
                }[];
                id: number;
                name: string;
                position: number;
                projectId: number;
            }[];
            id: number;
            name: string;
            userId: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createProject(dto: CreateProjectDto, req: RequestWithUserId): Promise<{
        id: number;
        name: string;
        userId: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProject(id: number, req: RequestWithUserId): Promise<{
        message: string;
    }>;
    updateProject(ProjectDto: UpdateProjectDto, id: number, req: RequestWithUserId): Promise<Projects>;
}
