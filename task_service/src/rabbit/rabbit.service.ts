import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestWithUserId } from 'task-project-razdva1994';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitService {
  constructor(
    @Inject('USER_INFO_TRANSPORT') private readonly client: ClientProxy,
  ) {}

  async sendToken(req: RequestWithUserId) {
    try {
      const authHeader = req.headers?.authorization;
      const token = authHeader.split(' ')[1];
      const observable = this.client.send('send_token', token);
      const user = await firstValueFrom(observable);
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
