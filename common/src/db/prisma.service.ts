import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

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
}
