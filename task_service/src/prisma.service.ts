import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // await this.createDefaultColumns();
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'>).$on(
      'beforeExit',
      async () => {
        await app.close();
      },
    );
  }

  // private async createDefaultColumns() {
  //   const defaultColumns = [
  //     { name: 'toDo', position: 1 },
  //     { name: 'inProgress', position: 2 },
  //     { name: 'done', position: 3 },
  //   ];
  //   for (const column of defaultColumns) {
  //     const existingColumn = await this.columns.findMany({
  //       where: { name: column.name },
  //     });
  //     if (existingColumn.length === 0) {
  //       await this.columns.create({
  //         data: column,
  //       });
  //     }
  //   }
  // }
}
