import { ApiProperty } from '@nestjs/swagger';
import { TaskFieldEnumOptions } from '@prisma/client';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  ValidateIf,
} from 'class-validator';

class CreateTaskFieldDto {
  @ApiProperty({ example: 'priority', description: 'Название поля задачи' })
  @Length(3, 20, { message: 'Имя должно быть от 3 до 20 символов' })
  @IsNotEmpty({ message: 'Поле имени должно быть заполнено' })
  @IsString({ message: 'Имя должно быть строкой' })
  readonly name: string;

  @ApiProperty({ example: 'HIGH', description: 'Значение поля' })
  @ValidateIf((o) => typeof o.value === 'string')
  @IsString({ message: 'Поле значения должно быть строкой' })
  @ValidateIf((o) => typeof o.value === 'number')
  @IsNumber({}, { message: 'Поле значения должно быть числом' })
  @ValidateIf((o) => Object.values(TaskFieldEnumOptions).includes(o.value))
  @IsEnum(TaskFieldEnumOptions, {
    message: 'Поле значения должно быть одним из допустимых значений',
  })
  @IsNotEmpty({ message: 'Поле значения должно быть заполнено' })
  readonly value: string | number | TaskFieldEnumOptions;
}

export { CreateTaskFieldDto };
