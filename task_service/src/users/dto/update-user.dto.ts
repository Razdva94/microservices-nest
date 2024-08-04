import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @ApiProperty({ example: 'user', description: 'Имя' })
  readonly name?: string;
  @ApiProperty({ example: 'email', description: 'Почта' })
  @IsString({ message: 'Почта должна быть строкой' })
  readonly email?: string;
  @ApiProperty({ example: 'strongpassword', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  readonly password?: string;
}
