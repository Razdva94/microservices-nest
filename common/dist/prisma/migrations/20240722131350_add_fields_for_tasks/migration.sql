-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('STRING', 'NUMBER');

-- CreateTable
CREATE TABLE "TaskField" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FieldType" NOT NULL,

    CONSTRAINT "TaskField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskFieldValueString" (
    "taskId" INTEGER NOT NULL,
    "taskFieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "TaskFieldValueString_pkey" PRIMARY KEY ("taskId","taskFieldId")
);

-- CreateTable
CREATE TABLE "TaskFieldValueNumber" (
    "taskId" INTEGER NOT NULL,
    "taskFieldId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TaskFieldValueNumber_pkey" PRIMARY KEY ("taskId","taskFieldId")
);

-- AddForeignKey
ALTER TABLE "TaskFieldValueString" ADD CONSTRAINT "TaskFieldValueString_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldValueString" ADD CONSTRAINT "TaskFieldValueString_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldValueNumber" ADD CONSTRAINT "TaskFieldValueNumber_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskFieldValueNumber" ADD CONSTRAINT "TaskFieldValueNumber_taskFieldId_fkey" FOREIGN KEY ("taskFieldId") REFERENCES "TaskField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
