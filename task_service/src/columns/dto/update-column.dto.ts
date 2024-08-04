import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

class UpdateColumnDto {
  @ApiProperty({ example: 'To do', description: 'Название Колонки' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name?: string;
}

export { UpdateColumnDto };
