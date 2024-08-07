import { RabbitService } from './rabbit.service';
export declare class AppController {
    private rabbitService;
    constructor(rabbitService: RabbitService);
    handleEvent(data: string): Promise<void>;
}
