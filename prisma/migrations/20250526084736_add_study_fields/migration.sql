-- AlterTable
ALTER TABLE `Study` ADD COLUMN `contactLink` VARCHAR(191) NULL,
    ADD COLUMN `contactMethod` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `latitude` DOUBLE NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `longitude` DOUBLE NULL,
    ADD COLUMN `maxParticipants` INTEGER NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL,
    ADD COLUMN `studyType` VARCHAR(191) NULL;
