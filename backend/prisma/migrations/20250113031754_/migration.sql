/*
  Warnings:

  - You are about to drop the column `review` on the `UserBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBook" DROP COLUMN "review",
ADD COLUMN     "reviewid" TEXT;

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_reviewid_fkey" FOREIGN KEY ("reviewid") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
