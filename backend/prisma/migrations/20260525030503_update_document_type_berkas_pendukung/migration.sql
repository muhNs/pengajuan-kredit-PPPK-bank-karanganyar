/*
  Warnings:

  - The values [SK] on the enum `BerkasPendukung_document_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `berkaspendukung` MODIFY `document_type` ENUM('KTP_KREDITUR', 'KTP_PASANGAN', 'KK', 'SURAT_NIKAH', 'IJASAH_TERAKHIR', 'SK_PPPK', 'SURAT_NPWP') NOT NULL;
