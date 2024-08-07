import { ClientProxy } from '@nestjs/microservices';
import { RequestWithUserId } from '@task-project/common/src';
export declare class RabbitService {
    private readonly client;
    constructor(client: ClientProxy);
    sendToken(req: RequestWithUserId): Promise<import("rxjs").Observable<any>>;
}
