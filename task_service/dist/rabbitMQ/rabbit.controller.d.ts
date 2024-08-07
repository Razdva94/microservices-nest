import { RabbitService } from './rabbit.service';
export declare class AppController {
    private readonly rabbitService;
    constructor(rabbitService: RabbitService);
    handleEvent(data: any): Promise<void>;
    sendOrder(req: any): Promise<import("rxjs").Observable<any>>;
}
