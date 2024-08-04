import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'body') {
      const obj = plainToClass(metadata.metatype, value);
      const errors = await validate(obj);

      if (errors.length) {
        const errorObject = {};

        errors.forEach((err) => {
          const propertyName = err.property;

          if (!errorObject[propertyName]) {
            errorObject[propertyName] = [];
          }

          errorObject[propertyName] = Object.values(err.constraints);
        });

        throw new ValidationException(errorObject);
      }

      return value;
    }
    if (metadata.type === 'param') {
      return value;
    }
  }
}
