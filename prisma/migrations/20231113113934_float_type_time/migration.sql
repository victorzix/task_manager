/*
  Warnings:

  - You are about to alter the column `time` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Tasks" ALTER COLUMN "time" SET DATA TYPE DOUBLE PRECISION;
