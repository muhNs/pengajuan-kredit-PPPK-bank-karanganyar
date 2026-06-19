-- AlterTable
ALTER TABLE `instansi` MODIFY `alamat` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'CS') NOT NULL DEFAULT 'ADMIN';
