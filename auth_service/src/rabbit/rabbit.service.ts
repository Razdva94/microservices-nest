import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class RabbitService {
  constructor(private jwtAuthGuard: JwtAuthGuard) {}

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
