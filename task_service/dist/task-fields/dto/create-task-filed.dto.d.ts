import { TaskFieldEnumOptions } from '@prisma/client';
declare class CreateTaskFieldDto {
    readonly name: string;
    readonly value: string | number | TaskFieldEnumOptions;
}
export { CreateTaskFieldDto };
