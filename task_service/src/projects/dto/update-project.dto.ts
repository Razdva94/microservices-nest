import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

class UpdateProjectDto {
  @ApiProperty({ example: 'Project 1', description: 'Название проекта' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  readonly name?: string;
  @ApiProperty({ example: 'difficult task', description: 'Описание проекта' })
  @IsString({ message: 'Описание должно быть строкой' })
  readonly description?: string;
}

export { UpdateProjectDto };
