/*
  Warnings:

  - Added the required column `title` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "title" TEXT NOT NULL;
