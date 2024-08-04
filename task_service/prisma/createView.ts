import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createView() {
  await prisma.$executeRaw`
    CREATE OR REPLACE VIEW sorted_projects AS
    SELECT *
    FROM "Projects"
    ORDER BY "userID" ASC, "columnID" ASC, "position" ASC;
  `;
  console.log('View "sorted_projects" has been created.');
}

createView()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
