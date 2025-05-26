/*
  Warnings:

  - You are about to drop the column `latitude` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Study` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Study` DROP COLUMN `latitude`,
    DROP COLUMN `location`,
    DROP COLUMN `longitude`;
