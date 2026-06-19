import { prisma } from "@/lib/prisma.js";
import type { CreatePengajuanInput } from "../schemas/pengajuan.schema.js";
import { DocumentType } from "../../../generated/prisma/client.js";

export const createPengajuan = async (
  data: CreatePengajuanInput,
  files: any,
) => {
  // Gunakan $transaction agar jika salah satu gagal, semua dibatalkan (rollback)
  return await prisma.$transaction(async (tx) => {
    // 1. Insert Data Diri
    const dataDiri = await tx.dataDiri.create({
      data: {
        nama_lengkap: data.nama_lengkap,
        alamat: data.alamat,
        kode_pos: data.kode_pos,
        no_handphone: data.no_handphone,
        email: data.email,
        nik: data.nik,
        npwp: data.npwp,
        nama_ibu_kandung: data.nama_ibu_kandung,
        status_pernikahan_id: data.status_pernikahan_id,
        status_rumah_id: data.status_rumah_id,
        jenis_kelamin_id: data.jenis_kelamin_id,
        nama_kerabat: data.nama_kerabat || null,
        alamat_kerabat: data.alamat_kerabat || null,
        no_handphone_kerabat: data.no_handphone_kerabat || null,
        nik_kerabat: data.nik_kerabat || null,
      },
    });

    // 2. Insert Data Pasangan (Hanya jika diisi)
    let dataPasangan = null;
    if (data.pasangan_nama && data.pasangan_nik) {
      dataPasangan = await tx.dataPasangan.create({
        data: {
          nama: data.pasangan_nama,
          alamat: data.pasangan_alamat || "",
          nik: data.pasangan_nik,
          no_telepon: data.pasangan_no_telepon || "",
        },
      });
    }

    // 3. Insert Data Penjamin
    const dataPenjamin = await tx.dataPenjamin.create({
      data: {
        nama: data.penjamin_nama,
        alamat: data.penjamin_alamat,
        nik: data.penjamin_nik,
        no_telepon: data.penjamin_no_telepon,
        hubungan_kerabat: data.penjamin_hubungan_kerabat,
        nama_pasangan_penjamin: data.penjamin_nama_pasangan || null,
        alamat_pasangan_penjamin: data.penjamin_alamat_pasangan || null,
        nik_pasangan_penjamin: data.penjamin_nik_pasangan || null,
        no_telepon_pasangan_penjamin: data.penjamin_no_telepon_pasangan || null,
      },
    });

    // 4. Insert Data Pekerjaan
    const dataPekerjaan = await tx.dataPekerjaan.create({
      data: {
        instansi_id: data.instansi_id,
        jabatan: data.jabatan,
        nip: data.nip,
        divisi: data.divisi,
        pendapatan_tetap: data.pendapatan_tetap,
        pendapatan_tidak_tetap: data.pendapatan_tidak_tetap,
      },
    });

    // 5. Insert Core Pengajuan Kredit (Menghubungkan semua ID di atas)
    const pengajuan = await tx.dataPengajuanKredit.create({
      data: {
        tujuan_kredit: data.tujuan_kredit,
        nominal: data.nominal,
        tenor: data.tenor,
        data_diri_id: dataDiri.id,
        data_pasangan_id: dataPasangan ? dataPasangan.id : null,
        data_penjamin_id: dataPenjamin.id,
        data_pekerjaan_id: dataPekerjaan.id,
      },
    });

    // 6. Menyusun Data Berkas Pendukung dari Multer
    const berkasToInsert = [];

    // Looping semua file yang ditangkap oleh Multer
    for (const [key, fileArray] of Object.entries(files)) {
      const file = (fileArray as any)[0];
      berkasToInsert.push({
        pengajuan_id: pengajuan.id,
        original_name: file.originalname,
        filename: file.filename,
        filepath: `uploads/dokumen/${file.filename}`, // Lokasi file untuk frontend
        mime_type: file.mimetype,
        document_type: key as DocumentType, // Otomatis terbaca misal: "KTP_KREDITUR"
      });
    }

    // Insert ke tabel BerkasPendukung jika ada file
    if (berkasToInsert.length > 0) {
      await tx.berkasPendukung.createMany({
        data: berkasToInsert,
      });
    }

    return pengajuan;
  });
};

// 1. Fungsi untuk mengambil data list tabel (Poin 1) disimpan ke dalam variabel
export const getAllPagination = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;

  // Kondisi pencarian nama kreditur
  const whereCondition = search
    ? {
        data_diri: {
          nama_lengkap: {
            contains: search,
          },
        },
      }
    : {};

  // Eksekusi paralel ke database MySQL
  const [items, total] = await Promise.all([
    prisma.dataPengajuanKredit.findMany({
      where: whereCondition,
      skip: skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        created_at: true,
        status: true,
        data_diri: {
          select: {
            nama_lengkap: true,
          },
        },
        data_pekerjaan: {
          select: {
            instansi: {
              select: {
                nama_instansi: true,
              },
            },
          },
        },
      },
    }),
    prisma.dataPengajuanKredit.count({
      where: whereCondition,
    }),
  ]);

  // Transformasi data agar flat/rata
  const formattedData = items.map((item) => ({
    id: item.id,
    status: item.status,
    nama_kreditur: item.data_diri?.nama_lengkap || "-",
    nama_instansi: item.data_pekerjaan?.instansi?.nama_instansi || "-",
    tanggal_pengajuan: item.created_at,
  }));

  return {
    metadata: {
      total_data: total,
      total_halaman: Math.ceil(total / limit),
      halaman_sekarang: page,
      limit: limit,
    },
    data: formattedData,
  };
};

// 2. Fungsi untuk mengambil detail pengajuan secara lengkap disimpan ke dalam variabel
export const getDetailById = async (id: number) => {
  const detailData = await prisma.dataPengajuanKredit.findUnique({
    where: {
      id: id,
    },
    include: {
      data_diri: {
        include: {
          status_rumah: true, // Menarik teks kepemilikan rumah
          status_pernikahan: true, // Menarik teks status pernikahan
          jenis_kelamin: true, // Menarik teks gender
        },
      },
      data_pasangan: true, // Menarik data pasangan (jika ada)
      data_penjamin: true, // Menarik data penjamin
      data_pekerjaan: {
        include: {
          instansi: true, // Menarik data detail instansi/dinas tempat bekerja
        },
      },
      berkas_pendukung: {
        select: {
          id: true,
          document_type: true,
          original_name: true,
          filename: true,
          filepath: true,
          mime_type: true,
        },
      },
    },
  });

  return detailData;
};

export const updatePengajuanFields = async (id: number, data: any) => {
  // Ambil data pengajuan lama terlebih dahulu untuk mendapatkan ID relasi tabelnya
  const pengajuanLama = await prisma.dataPengajuanKredit.findUnique({
    where: { id: id },
    select: {
      status: true,
      data_diri_id: true,
      data_pasangan_id: true,
      data_penjamin_id: true,
      data_pekerjaan_id: true,
    },
  });

  if (!pengajuanLama) return null;

  // Jalankan pembaharuan data terisolasi menggunakan Prisma Transaction ($transaction)
  return await prisma.$transaction(async (tx) => {
    // A. Update Tabel Data Diri jika ada perubahan data diri
    if (
      data.nama_lengkap ||
      data.alamat ||
      data.no_handphone ||
      data.email ||
      data.nik ||
      data.nama_ibu_kandung ||
      data.status_rumah_id ||
      data.status_pernikahan_id ||
      data.jenis_kelamin_id ||
      data.nama_kerabat ||
      data.alamat_kerabat ||
      data.no_handphone_kerabat ||
      data.nik_kerabat
    ) {
      await tx.dataDiri.update({
        where: { id: pengajuanLama.data_diri_id },
        data: {
          nama_lengkap: data.nama_lengkap,
          alamat: data.alamat,
          kode_pos: data.kode_pos,
          no_handphone: data.no_handphone,
          email: data.email,
          nik: data.nik,
          npwp: data.npwp,
          nama_ibu_kandung: data.nama_ibu_kandung,
          status_rumah_id: data.status_rumah_id,
          status_pernikahan_id: data.status_pernikahan_id,
          jenis_kelamin_id: data.jenis_kelamin_id,
          nama_kerabat: data.nama_kerabat || null,
          alamat_kerabat: data.alamat_kerabat || null,
          no_handphone_kerabat: data.no_handphone_kerabat || null,
          nik_kerabat: data.nik_kerabat || null,
        },
      });
    }

    // B. Update Tabel Data Pasangan (jika nasabah memiliki pasangan / data_pasangan_id tersedia)
    if (
      pengajuanLama.data_pasangan_id &&
      (data.pasangan_nama ||
        data.pasangan_alamat ||
        data.pasangan_nik ||
        data.pasangan_no_telepon)
    ) {
      await tx.dataPasangan.update({
        where: { id: pengajuanLama.data_pasangan_id },
        data: {
          nama: data.pasangan_nama,
          alamat: data.pasangan_alamat,
          nik: data.pasangan_nik,
          no_telepon: data.pasangan_no_telepon,
        },
      });
    }

    // C. Update Tabel Data Penjamin jika ada perubahan
    if (
      data.penjamin_nama ||
      data.penjamin_alamat ||
      data.penjamin_nik ||
      data.penjamin_no_telepon ||
      data.penjamin_hubungan_kerabat ||
      data.penjamin_nama_pasangan ||
      data.penjamin_alamat_pasangan ||
      data.penjamin_nik_pasangan ||
      data.penjamin_no_telepon_pasangan
    ) {
      await tx.dataPenjamin.update({
        where: { id: pengajuanLama.data_penjamin_id },
        data: {
          nama: data.penjamin_nama,
          alamat: data.penjamin_alamat,
          nik: data.penjamin_nik,
          no_telepon: data.penjamin_no_telepon,
          hubungan_kerabat: data.penjamin_hubungan_kerabat,
          nama_pasangan_penjamin: data.penjamin_nama_pasangan || null,
          alamat_pasangan_penjamin: data.penjamin_alamat_pasangan || null,
          nik_pasangan_penjamin: data.penjamin_nik_pasangan || null,
          no_telepon_pasangan_penjamin:
            data.penjamin_no_telepon_pasangan || null,
        },
      });
    }

    // D. Update Tabel Data Pekerjaan jika ada perubahan
    if (
      data.instansi_id ||
      data.jabatan ||
      data.nip ||
      data.divisi ||
      data.pendapatan_tetap ||
      data.pendapatan_tidak_tetap
    ) {
      await tx.dataPekerjaan.update({
        where: { id: pengajuanLama.data_pekerjaan_id },
        data: {
          instansi_id: data.instansi_id,
          jabatan: data.jabatan,
          nip: data.nip,
          divisi: data.divisi,
          pendapatan_tetap: data.pendapatan_tetap,
          pendapatan_tidak_tetap: data.pendapatan_tidak_tetap,
        },
      });
    }

    // E. Update Tabel Inti (DataPengajuanKredit) itu sendiri
    const pengajuanUpdated = await tx.dataPengajuanKredit.update({
      where: { id: id },
      data: {
        tujuan_kredit: data.tujuan_kredit,
        nominal: data.nominal,
        tenor: data.tenor,
        status: data.status,
      },
    });

    return pengajuanUpdated;
  });
};
