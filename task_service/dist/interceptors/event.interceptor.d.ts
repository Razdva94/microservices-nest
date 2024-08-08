import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RabbitService } from 'src/rabbit/rabbit.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class EventInterceptor implements NestInterceptor {
    private readonly rabbitService;
    private readonly eventEmitter;
    constructor(rabbitService: RabbitService, eventEmitter: EventEmitter2);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
