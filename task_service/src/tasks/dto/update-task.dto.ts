import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

class UpdateTaskDto {
  @ApiProperty({ example: 'task 1', description: 'Задача' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name?: string;
  @ApiProperty({ example: 'difficult task', description: 'Описание задачи' })
  @IsString({ message: 'Описание должно быть строкой' })
  readonly description?: string;
}

export { UpdateTaskDto };
