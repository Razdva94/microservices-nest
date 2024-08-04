"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createView() {
    await prisma.$executeRaw `
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
//# sourceMappingURL=createView.js.map