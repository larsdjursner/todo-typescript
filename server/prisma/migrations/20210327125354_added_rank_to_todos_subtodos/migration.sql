/*
  Warnings:

  - Made the column `userId` on table `Todo` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SubTodo" ADD COLUMN     "rank" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "rank" SERIAL NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;
