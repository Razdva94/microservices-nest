import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'strongpassword', description: 'Пароль' })
  @IsNotEmpty({ message: 'пароль должен быть заполнен' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(4, 16, {
    message: 'Длина пароля не меньше 4 и не больше 16 символов',
  })
  readonly password: string;
  @IsNotEmpty({ message: 'почта должна быть заполнена' })
  @IsEmail({}, { message: 'Некорректная почта' })
  @ApiProperty({ example: 'razdva@mail.ru', description: 'Почта' })
  readonly email: string;
}
