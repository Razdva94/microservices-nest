import { Prisma } from '@prisma/client';
export declare class RefreshToken implements Prisma.RefreshTokensCreateInput {
    user: Prisma.UsersCreateNestedOneWithoutRefreshTokenInput;
    userId: number;
    id: number;
    token: string;
    exp: Date;
}
