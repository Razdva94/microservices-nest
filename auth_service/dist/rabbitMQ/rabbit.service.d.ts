import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
export declare class RabbitService {
    private readonly client;
    private jwtAuthGuard;
    constructor(client: ClientProxy, jwtAuthGuard: JwtAuthGuard);
    sendOrder(order: {
        id: number;
        name: string;
    }): Promise<import("rxjs").Observable<any>>;
    handleEvent(data: string): Promise<any>;
}
