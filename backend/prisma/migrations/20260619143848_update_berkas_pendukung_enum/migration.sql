/*
  Warnings:

  - The values [SK_PPPK] on the enum `BerkasPendukung_document_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `berkaspendukung` MODIFY `document_type` ENUM('KTP_KREDITUR', 'KTP_PASANGAN', 'KK', 'SURAT_NIKAH', 'IJASAH_TERAKHIR', 'SK', 'SURAT_NPWP') NOT NULL;

-- AlterTable
ALTER TABLE `datadiri` ADD COLUMN `alamat_kerabat` TEXT NULL,
    ADD COLUMN `nama_kerabat` VARCHAR(255) NULL,
    ADD COLUMN `nik_kerabat` VARCHAR(16) NULL,
    ADD COLUMN `no_handphone_kerabat` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `datapengajuankredit` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Menunggu Review';

-- AlterTable
ALTER TABLE `datapenjamin` ADD COLUMN `alamat_pasangan_penjamin` TEXT NULL,
    ADD COLUMN `nama_pasangan_penjamin` VARCHAR(255) NULL,
    ADD COLUMN `nik_pasangan_penjamin` VARCHAR(16) NULL,
    ADD COLUMN `no_telepon_pasangan_penjamin` VARCHAR(20) NULL;
