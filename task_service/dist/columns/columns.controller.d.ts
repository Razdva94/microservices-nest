import { RequestWithUserId } from 'task-project-razdva1994';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { NextFunction } from 'express';
import { Response } from 'express';
import { UpdateColumnDto } from './dto/update-column.dto';
declare class ColumnsController {
    private columnsService;
    constructor(columnsService: ColumnsService);
    createColumn(columnDto: CreateColumnDto, req: RequestWithUserId, next: NextFunction, res: Response): Promise<void>;
    updateColumn(id: string, ColumnDto: UpdateColumnDto, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    deleteColumn(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
    moveColumn(id: string, req: RequestWithUserId, res: Response, next: NextFunction): Promise<void>;
}
export { ColumnsController };
