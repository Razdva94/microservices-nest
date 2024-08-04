import { TaskFieldEnumOptions } from '@prisma/client';
declare class UpdateTaskFieldDto {
    readonly name?: string;
    readonly value?: string | number | TaskFieldEnumOptions;
}
export { UpdateTaskFieldDto };
