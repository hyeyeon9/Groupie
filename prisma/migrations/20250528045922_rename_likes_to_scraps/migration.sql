/*
  Warnings:

  - You are about to drop the column `like` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_studyId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- AlterTable
ALTER TABLE `Study` DROP COLUMN `like`,
    ADD COLUMN `scrap` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Like`;

-- CreateTable
CREATE TABLE `Scrap` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `studyId` INTEGER NOT NULL,

    UNIQUE INDEX `Scrap_userId_studyId_key`(`userId`, `studyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Scrap` ADD CONSTRAINT `Scrap_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Scrap` ADD CONSTRAINT `Scrap_studyId_fkey` FOREIGN KEY (`studyId`) REFERENCES `Study`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
