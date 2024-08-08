import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitService } from './rabbit.service';

@Controller()
export class AppController {
  constructor(private rabbitService: RabbitService) {}

  @MessagePattern('send_token')
  async handleEvent(@Payload() data: string) {
    const user = await this.rabbitService.handleEvent(data);
    console.log(user);
    return user;
  }
}
