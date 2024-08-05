/*
  Warnings:

  - You are about to drop the column `userId` on the `Columns` table. All the data in the column will be lost.
  - You are about to drop the column `columnId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,name]` on the table `Columns` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Columns" DROP CONSTRAINT "Columns_userId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_columnId_fkey";

-- DropIndex
DROP INDEX "Columns_name_key";

-- DropIndex
DROP INDEX "Projects_name_key";

-- DropIndex
DROP INDEX "Projects_name_userId_key";

-- AlterTable
ALTER TABLE "Columns" DROP COLUMN "userId",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "columnId",
DROP COLUMN "createdAt",
DROP COLUMN "position",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "columnId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_id_key" ON "Tasks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_projectId_name_key" ON "Tasks"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Columns_projectId_name_key" ON "Columns"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_userId_name_key" ON "Projects"("userId", "name");

-- AddForeignKey
ALTER TABLE "Columns" ADD CONSTRAINT "Columns_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
