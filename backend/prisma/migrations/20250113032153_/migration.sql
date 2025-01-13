/*
  Warnings:

  - Added the required column `numberOfPages` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "numberOfPages" INTEGER NOT NULL;
