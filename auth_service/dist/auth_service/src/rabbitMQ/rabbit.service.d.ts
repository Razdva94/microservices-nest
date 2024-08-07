import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitService {
    private readonly client;
    constructor(client: ClientProxy);
    sendOrder(order: {
        id: number;
        name: string;
    }): Promise<import("rxjs").Observable<any>>;
}
