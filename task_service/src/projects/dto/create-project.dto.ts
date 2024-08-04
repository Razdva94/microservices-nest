import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

class CreateProjectDto {
  @ApiProperty({ example: 'Project 1', description: 'Название проекта' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  readonly name: string;
  @ApiProperty({ example: 'difficult task', description: 'Описание проекта' })
  @IsString({ message: 'Описание должно быть строкой' })
  readonly description: string;
}

export { CreateProjectDto };
