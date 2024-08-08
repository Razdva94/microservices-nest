import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestWithUserId } from '@task-project/common/src';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RabbitService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async sendToken(req: RequestWithUserId) {
    const authHeader = req.headers?.authorization;
    const token = authHeader.split(' ')[1];
    const observable = this.client.send('send_token', token);
    const user = await firstValueFrom(observable);
    return user;
  }
}
