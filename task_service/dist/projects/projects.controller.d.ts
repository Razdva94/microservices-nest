import { NextFunction } from 'express';
import { RequestWithUserId } from 'task-project-razdva1994';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    createProject(projectDto: CreateProjectDto, req: RequestWithUserId, next: NextFunction, res: Response): Promise<void>;
    updateProject(id: string, ProjectDto: UpdateProjectDto, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    deleteProject(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    getProjects(req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
}
