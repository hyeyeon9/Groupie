/*
  Warnings:

  - Added the required column `authorId` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Study` ADD COLUMN `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Study` ADD CONSTRAINT `Study_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
