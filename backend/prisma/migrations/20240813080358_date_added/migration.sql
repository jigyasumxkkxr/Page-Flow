/*
  Warnings:

  - You are about to drop the column `commentorId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentorId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentorId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
