import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

class CreateTaskDto {
  @ApiProperty({ example: 'task 1', description: 'Название задачи' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  @IsNotEmpty({ message: 'Поле имя должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;
  @ApiProperty({ example: 'difficult task', description: 'Описание задачи' })
  @IsString({ message: 'Описание должно быть строкой' })
  readonly description: string;
  @ApiProperty({ example: '30', description: 'Номер колонки' })
  @IsNumber({}, { message: 'Id колонки должно быть числом' })
  @IsNotEmpty({ message: 'Поле айди колонки должно быть заполнено' })
  readonly columnId: number;
}

export { CreateTaskDto };
