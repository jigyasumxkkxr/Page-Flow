-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentorId" TEXT NOT NULL DEFAULT 'placeholder-id';

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentorId_fkey" FOREIGN KEY ("commentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
