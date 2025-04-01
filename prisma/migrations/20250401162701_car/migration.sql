-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_ownerId_fkey";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
