import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'razdva', description: 'Имя' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: 'razdva@mail.ru', description: 'Почта' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  readonly email: string;
  @IsEmail({}, { message: 'Некорректная почта' })
  @ApiProperty({ example: 'strongpassword', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  readonly password: string;
}
