/*
  Warnings:

  - Added the required column `userId` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Columns" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "position" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
