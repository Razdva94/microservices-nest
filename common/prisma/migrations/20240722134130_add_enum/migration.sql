-- CreateEnum
CREATE TYPE "TaskFieldEnumOptions" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterEnum
ALTER TYPE "FieldType" ADD VALUE 'ENUM';

-- CreateTable
CREATE TABLE "TaskFieldValueEnum" (
    "taskId" INTEGER NOT NULL,
    "taskFieldId" INTEGER NOT NULL,
    "value" "TaskFieldEnumOptions" NOT NULL,

    CONSTRAINT "TaskFieldValueEnum_pkey" PRIMARY KEY ("taskId","taskFieldId")
);

-- AddForeignKey
ALTER TABLE "TaskFieldValueEnum" ADD CONSTRAINT "TaskFieldValueEnum_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldValueEnum" ADD CONSTRAINT "TaskFieldValueEnum_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
