import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

class CreateColumnDto {
  @ApiProperty({ example: 'To do', description: 'Название Колонки' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  readonly name: string;
}

export { CreateColumnDto };
