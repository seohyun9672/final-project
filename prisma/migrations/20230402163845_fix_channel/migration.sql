/*
  Warnings:

  - You are about to drop the column `totalComments` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `totalLikes` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_channelId_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "totalComments",
DROP COLUMN "totalLikes";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "channelId";
