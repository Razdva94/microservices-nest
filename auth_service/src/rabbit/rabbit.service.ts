import {
  Injectable,
  Inject,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class RabbitService {
  constructor(
    @Inject('TASK_SERVICE') private readonly client: ClientProxy,
    private jwtAuthGuard: JwtAuthGuard,
  ) {}

  async sendOrder(order: { id: number; name: string }) {
    return this.client.emit('send_user_info', order);
  }

  async handleEvent(data: string) {
    const fakeRequest = {
      headers: {
        authorization: `Bearer ${data}`,
      },
      user: null,
    };

    const fakeContext = {
      switchToHttp: () => ({
        getRequest: () => fakeRequest,
      }),
    };

    try {
      const canActivate = await this.jwtAuthGuard.canActivate(
        fakeContext as unknown as ExecutionContext,
      );
      if (canActivate) {
        // Используйте данные пользователя для дальнейшей обработки
        const user = fakeRequest.user;
        // Здесь можно добавить логику обработки данных пользователя
        return user;
      } else {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw e;
      } else {
        throw new InternalServerErrorException('Ошибка аутентификации');
      }
    }
  }
}
