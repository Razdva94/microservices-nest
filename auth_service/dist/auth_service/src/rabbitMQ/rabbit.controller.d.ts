import { OrderService } from './rabbit.service';
export declare class AppController {
    private readonly orderService;
    constructor(orderService: OrderService);
    handleEvent(data: any): Promise<void>;
    sendOrder(): Promise<any>;
}
