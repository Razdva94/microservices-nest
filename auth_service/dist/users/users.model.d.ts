import { Prisma } from '@prisma/client';
declare class User implements Prisma.UsersCreateInput {
    id: number;
    name: string;
    email: string;
    password: string;
}
export { User };
