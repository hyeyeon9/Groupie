-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_studyId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_studyId_fkey`;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_studyId_fkey` FOREIGN KEY (`studyId`) REFERENCES `Study`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_studyId_fkey` FOREIGN KEY (`studyId`) REFERENCES `Study`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
