import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RabbitService } from './rabbit.service';

@Controller()
export class AppController {
  constructor(private rabbitService: RabbitService) {}

  @EventPattern('send_token')
  async handleEvent(@Payload() data: string) {
    await this.rabbitService.handleEvent(data);
  }
}
