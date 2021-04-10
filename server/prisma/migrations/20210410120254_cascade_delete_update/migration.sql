-- AlterTable
ALTER TABLE "SubTodo" ALTER COLUMN "parentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "userId" DROP NOT NULL;
