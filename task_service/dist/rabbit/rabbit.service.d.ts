import { ClientProxy } from '@nestjs/microservices';
import { RequestWithUserId } from 'task-project-razdva1994';
export declare class RabbitService {
    private readonly client;
    constructor(client: ClientProxy);
    sendToken(req: RequestWithUserId): Promise<any>;
}
