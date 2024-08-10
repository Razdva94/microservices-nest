import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
//** Тут просиходит только проверка валидности accessToken
//** Так же проверяется наличие refreshToken в куках, но он не валидируется
//** Так как для этого нужен запрос в базу данных, посчитал это неэффективным
//** refreshToken нужен только для того, чтобы перезапросить accessToken
//** Таким образом защита достигается частым обновлением accessToken, который отвечает за авторизацию
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      const userData = this.jwtService.verify(token);
      req.user = userData;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
