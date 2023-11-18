/*
  Warnings:

  - You are about to drop the column `time` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `time_to_complete` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_userId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "time",
DROP COLUMN "userId",
ADD COLUMN     "time_to_complete" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
