/*
  Warnings:

  - Changed the type of `time_to_complete` on the `Tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "time_to_complete",
ADD COLUMN     "time_to_complete" TIMESTAMP(3) NOT NULL;
