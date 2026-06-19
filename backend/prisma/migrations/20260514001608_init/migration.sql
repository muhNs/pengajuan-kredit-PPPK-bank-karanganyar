-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `refreshToken` VARCHAR(255) NOT NULL,
    `exp_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `RefreshToken_refreshToken_key`(`refreshToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusRumah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kepemilikan` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusPernikahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JenisKelamin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instansi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_instansi` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nama_kepala_dinas` VARCHAR(255) NOT NULL,
    `nip_kepala_dinas` VARCHAR(100) NOT NULL,
    `nama_bendahara_dinas` VARCHAR(255) NOT NULL,
    `nip_bendahara_dinas` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataDiri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `kode_pos` VARCHAR(10) NOT NULL,
    `no_handphone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `nik` VARCHAR(16) NOT NULL,
    `npwp` VARCHAR(20) NULL,
    `nama_ibu_kandung` VARCHAR(255) NOT NULL,
    `status_pernikahan_id` INTEGER NOT NULL,
    `status_rumah_id` INTEGER NOT NULL,
    `jenis_kelamin_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPasangan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nik` VARCHAR(16) NOT NULL,
    `no_telepon` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPenjamin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `alamat` TEXT NOT NULL,
    `nik` VARCHAR(16) NOT NULL,
    `no_telepon` VARCHAR(20) NOT NULL,
    `hubungan_kerabat` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instansi_id` INTEGER NOT NULL,
    `jabatan` VARCHAR(255) NOT NULL,
    `nip` VARCHAR(100) NOT NULL,
    `divisi` VARCHAR(255) NULL,
    `pendapatan_tetap` DECIMAL(15, 2) NOT NULL,
    `pendapatan_tidak_tetap` DECIMAL(15, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BerkasPendukung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pengajuan_id` INTEGER NOT NULL,
    `original_name` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `filepath` TEXT NOT NULL,
    `mime_type` VARCHAR(100) NOT NULL,
    `document_type` ENUM('KTP_KREDITUR', 'KTP_PASANGAN', 'KK', 'SURAT_NIKAH', 'IJASAH_TERAKHIR', 'SK', 'SURAT_NPWP') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataPengajuanKredit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tujuan_kredit` TEXT NOT NULL,
    `nominal` DECIMAL(15, 2) NOT NULL,
    `tenor` INTEGER NOT NULL,
    `data_diri_id` INTEGER NOT NULL,
    `data_pasangan_id` INTEGER NULL,
    `data_penjamin_id` INTEGER NOT NULL,
    `data_pekerjaan_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataDiri` ADD CONSTRAINT `DataDiri_status_pernikahan_id_fkey` FOREIGN KEY (`status_pernikahan_id`) REFERENCES `StatusPernikahan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataDiri` ADD CONSTRAINT `DataDiri_status_rumah_id_fkey` FOREIGN KEY (`status_rumah_id`) REFERENCES `StatusRumah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataDiri` ADD CONSTRAINT `DataDiri_jenis_kelamin_id_fkey` FOREIGN KEY (`jenis_kelamin_id`) REFERENCES `JenisKelamin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPekerjaan` ADD CONSTRAINT `DataPekerjaan_instansi_id_fkey` FOREIGN KEY (`instansi_id`) REFERENCES `Instansi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BerkasPendukung` ADD CONSTRAINT `BerkasPendukung_pengajuan_id_fkey` FOREIGN KEY (`pengajuan_id`) REFERENCES `DataPengajuanKredit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPengajuanKredit` ADD CONSTRAINT `DataPengajuanKredit_data_diri_id_fkey` FOREIGN KEY (`data_diri_id`) REFERENCES `DataDiri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPengajuanKredit` ADD CONSTRAINT `DataPengajuanKredit_data_pasangan_id_fkey` FOREIGN KEY (`data_pasangan_id`) REFERENCES `DataPasangan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPengajuanKredit` ADD CONSTRAINT `DataPengajuanKredit_data_penjamin_id_fkey` FOREIGN KEY (`data_penjamin_id`) REFERENCES `DataPenjamin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataPengajuanKredit` ADD CONSTRAINT `DataPengajuanKredit_data_pekerjaan_id_fkey` FOREIGN KEY (`data_pekerjaan_id`) REFERENCES `DataPekerjaan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
