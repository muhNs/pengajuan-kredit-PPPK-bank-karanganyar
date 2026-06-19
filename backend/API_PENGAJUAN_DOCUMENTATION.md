# Dokumentasi API Pengajuan

## Ringkasan

API ini digunakan oleh frontend untuk membuat pengajuan kredit. Endpoint ini menerima data formulir dan lampiran berkas pendukung dalam format multipart/form-data.

## Base URL

```
http://localhost:5000/api/v1/pengajuan
```

## Endpoint Create Pengajuan

- **Method:** `POST`
- **URL:** `/createPengajuan`
- **Tipe Konten:** `multipart/form-data`
- **Authentication:** Tidak diperlukan (public API)

### Field Form Data

#### Data Diri

- `nama_lengkap` (string, required) - minimal 3 karakter
- `alamat` (string, required) - minimal 5 karakter
- `kode_pos` (string, required) - minimal 4 karakter
- `no_handphone` (string, required) - minimal 10 karakter
- `email` (string, required) - format email valid
- `nik` (string, required) - harus 16 digit
- `npwp` (string, optional)
- `nama_ibu_kandung` (string, required) - minimal 3 karakter
- `status_pernikahan_id` (number, required)
- `status_rumah_id` (number, required)
- `jenis_kelamin_id` (number, required)

#### Data Pasangan (Opsional)

- `pasangan_nama` (string, optional)
- `pasangan_alamat` (string, optional)
- `pasangan_nik` (string, optional)
- `pasangan_no_telepon` (string, optional)

#### Data Penjamin

- `penjamin_nama` (string, required) - minimal 3 karakter
- `penjamin_alamat` (string, required) - minimal 5 karakter
- `penjamin_nik` (string, required) - harus 16 digit
- `penjamin_no_telepon` (string, required) - minimal 10 karakter
- `penjamin_hubungan_kerabat` (string, required) - minimal 2 karakter

#### Data Pekerjaan

- `instansi_id` (number, required)
- `jabatan` (string, required) - minimal 2 karakter
- `nip` (string, required) - minimal 5 karakter
- `divisi` (string, optional)
- `pendapatan_tetap` (number, required)
- `pendapatan_tidak_tetap` (number, optional, default 0)

#### Data Pengajuan

- `tujuan_kredit` (string, required) - minimal 3 karakter
- `nominal` (number, required)
- `tenor` (number, required)

### Field Lampiran File

Gunakan `multipart/form-data` dengan field file berikut:

- `KTP_KREDITUR` (file, required)
- `KTP_PASANGAN` (file, optional)
- `KK` (file, required)
- `SURAT_NIKAH` (file, optional)
- `IJASAH_TERAKHIR` (file, optional)
- `SK` (file, optional)
- `SURAT_NPWP` (file, optional)

> Catatan: format file yang didukung adalah `jpg`, `jpeg`, `png`, dan `pdf`, dengan ukuran maksimal 5 MB per file.

## Contoh Request Fetch (Frontend)

```javascript
const submitPengajuan = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/pengajuan/createPengajuan",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal mengirim pengajuan");
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Contoh penggunaan
const formData = new FormData();
formData.append("nama_lengkap", "Budi Santoso");
formData.append("alamat", "Jl. Merpati No. 10");
formData.append("kode_pos", "12345");
formData.append("no_handphone", "081234567890");
formData.append("email", "budi@example.com");
formData.append("nik", "1234567890123456");
formData.append("nama_ibu_kandung", "Siti Aminah");
formData.append("status_pernikahan_id", "1");
formData.append("status_rumah_id", "2");
formData.append("jenis_kelamin_id", "1");
formData.append("penjamin_nama", "Anton");
formData.append("penjamin_alamat", "Jl. Mawar 3");
formData.append("penjamin_nik", "6543210987654321");
formData.append("penjamin_no_telepon", "081298765432");
formData.append("penjamin_hubungan_kerabat", "Saudara");
formData.append("instansi_id", "5");
formData.append("jabatan", "Manager");
formData.append("nip", "1987654321");
formData.append("pendapatan_tetap", "10000000");
formData.append("pendapatan_tidak_tetap", "2000000");
formData.append("tujuan_kredit", "Modal usaha");
formData.append("nominal", "50000000");
formData.append("tenor", "24");

formData.append("KTP_KREDITUR", fileKtpKreditur);
formData.append("KK", fileKk);
// formData.append("KTP_PASANGAN", fileKtpPasangan);
// formData.append("SURAT_NIKAH", fileSuratNikah);
// formData.append("IJASAH_TERAKHIR", fileIjazah);
// formData.append("SK", fileSk);
// formData.append("SURAT_NPWP", fileNpwp);

const result = await submitPengajuan(formData);
console.log(result);
```

## Contoh Response

### Success 201

```json
{
  "message": "Formulir pengajuan kredit berhasil dikirim.",
  "data": {
    "id": 1,
    "nama_lengkap": "Budi Santoso",
    "alamat": "Jl. Merpati No. 10",
    "nominal": 50000000,
    "tenor": 24,
    "status": "pending",
    "createdAt": "2026-05-18T08:00:00.000Z"
  }
}
```

### Error 400

```json
{
  "error": "Berkas pendukung wajib diupload."
}
```

### Error 400 (Validasi)

```json
{
  "error": [
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "path": ["nama_lengkap"],
      "message": "String must contain at least 3 character(s)"
    }
  ]
}
```

### Error 500

```json
{
  "error": "Terjadi kesalahan pada server."
}
```

---

# Dokumentasi API Pengajuan Admin

> **Status:** Admin/CS hanya  
> **Authentication:** Diperlukan (JWT Token)

Endpoint berikut digunakan oleh frontend admin untuk mengelola data pengajuan kredit.

## Base URL

```
http://localhost:5000/api/v1/pengajuan
```

## Endpoint List Pengajuan (Admin)

- **Method:** `GET`
- **URL:** `/listPengajuanAdmin`
- **Authentication:** Required (JWT Token)
- **Authorization:** ADMIN, CS

### Query Parameters

| Parameter | Type   | Required | Default | Deskripsi                      |
| --------- | ------ | -------- | ------- | ------------------------------ |
| `page`    | number | No       | 1       | Nomor halaman                  |
| `limit`   | number | No       | 10      | Jumlah data per halaman        |
| `search`  | string | No       | -       | Cari berdasarkan nama atau NIK |

### Contoh Request

```bash
GET /api/v1/pengajuan/listPengajuanAdmin?page=1&limit=10&search=Budi
Authorization: Bearer <jwt_token>
```

### Contoh Response Success 200

```json
{
  "message": "Berhasil mengambil daftar pengajuan kredit",
  "metadata": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  },
  "data": [
    {
      "id": 1,
      "nama_lengkap": "Budi Santoso",
      "email": "budi@example.com",
      "nik": "1234567890123456",
      "no_handphone": "081234567890",
      "nominal": 50000000,
      "tenor": 24,
      "status": "pending",
      "tujuan_kredit": "Modal usaha",
      "createdAt": "2026-05-18T08:00:00.000Z"
    },
    {
      "id": 2,
      "nama_lengkap": "Ani Wijaya",
      "email": "ani@example.com",
      "nik": "6543210987654321",
      "no_handphone": "081298765432",
      "nominal": 75000000,
      "tenor": 36,
      "status": "approved",
      "tujuan_kredit": "Renovasi rumah",
      "createdAt": "2026-05-19T10:30:00.000Z"
    }
  ]
}
```

### Contoh Response Error

**401 Unauthorized**

```json
{
  "error": "Token tidak valid atau tidak ada"
}
```

**403 Forbidden**

```json
{
  "error": "Anda tidak memiliki akses ke resource ini"
}
```

---

## Endpoint Detail Pengajuan (Admin)

- **Method:** `GET`
- **URL:** `/detailPengajuanAdmin/:id`
- **Authentication:** Required (JWT Token)
- **Authorization:** ADMIN, CS

### URL Parameters

| Parameter | Type   | Required | Deskripsi    |
| --------- | ------ | -------- | ------------ |
| `id`      | number | Yes      | ID Pengajuan |

### Contoh Request

```bash
GET /api/v1/pengajuan/detailPengajuanAdmin/1
Authorization: Bearer <jwt_token>
```

### Contoh Response Success 200

```json
{
  "message": "Berhasil mengambil detail data pengajuan kredit",
  "data": {
    "id": 1,
    "nama_lengkap": "Budi Santoso",
    "alamat": "Jl. Merpati No. 10",
    "kode_pos": "12345",
    "no_handphone": "081234567890",
    "email": "budi@example.com",
    "nik": "1234567890123456",
    "npwp": null,
    "nama_ibu_kandung": "Siti Aminah",
    "status_pernikahan_id": 1,
    "status_rumah_id": 2,
    "jenis_kelamin_id": 1,
    "pasangan_nama": null,
    "pasangan_alamat": null,
    "pasangan_nik": null,
    "pasangan_no_telepon": null,
    "penjamin_nama": "Anton",
    "penjamin_alamat": "Jl. Mawar 3",
    "penjamin_nik": "6543210987654321",
    "penjamin_no_telepon": "081298765432",
    "penjamin_hubungan_kerabat": "Saudara",
    "instansi_id": 5,
    "jabatan": "Manager",
    "nip": "1987654321",
    "divisi": "Marketing",
    "pendapatan_tetap": 10000000,
    "pendapatan_tidak_tetap": 2000000,
    "tujuan_kredit": "Modal usaha",
    "nominal": 50000000,
    "tenor": 24,
    "status": "pending",
    "createdAt": "2026-05-18T08:00:00.000Z",
    "updatedAt": "2026-05-18T08:00:00.000Z",
    "berkasPendukung": [
      {
        "id": 1,
        "tipe_berkas": "KTP_KREDITUR",
        "nama_file": "ktp_1234567890123456.pdf",
        "url": "http://localhost:5000/uploads/dokumen/ktp_1234567890123456.pdf"
      },
      {
        "id": 2,
        "tipe_berkas": "KK",
        "nama_file": "kk_1234567890123456.pdf",
        "url": "http://localhost:5000/uploads/dokumen/kk_1234567890123456.pdf"
      }
    ]
  }
}
```

### Contoh Response Error

**404 Not Found**

```json
{
  "error": "Data pengajuan kredit tidak ditemukan atau sudah dihapus."
}
```

**400 Bad Request**

```json
{
  "error": "Parameter tidak valid"
}
```

---

## Endpoint Update Pengajuan (Admin)

- **Method:** `PUT`
- **URL:** `/updatePengajuanAdmin/:id`
- **Authentication:** Required (JWT Token)
- **Authorization:** ADMIN, CS
- **Content-Type:** `application/json`

### URL Parameters

| Parameter | Type   | Required | Deskripsi    |
| --------- | ------ | -------- | ------------ |
| `id`      | number | Yes      | ID Pengajuan |

### Request Body (Semua field opsional - partial update)

```json
{
  "status": "approved",
  "catatan_admin": "Pengajuan disetujui dengan syarat umum"
}
```

### Field yang bisa diupdate

| Field                                 | Type   | Deskripsi                                           |
| ------------------------------------- | ------ | --------------------------------------------------- |
| `status`                              | string | Status pengajuan (pending, approved, rejected, etc) |
| `tujuan_kredit`                       | string | Tujuan kredit (minimal 3 karakter)                  |
| `nominal`                             | number | Nominal pinjaman                                    |
| `tenor`                               | number | Tenor pinjaman (bulan)                              |
| Dan semua field lainnya sesuai schema | -      | Lihat field di create pengajuan                     |

### Contoh Request

```bash
PUT /api/v1/pengajuan/updatePengajuanAdmin/1
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "approved",
  "nominal": 50000000,
  "tenor": 24
}
```

### Contoh Response Success 200

```json
{
  "message": "Data pengajuan kredit berhasil diperbarui oleh admin.",
  "data": {
    "id": 1,
    "nama_lengkap": "Budi Santoso",
    "email": "budi@example.com",
    "nik": "1234567890123456",
    "nominal": 50000000,
    "tenor": 24,
    "status": "approved",
    "tujuan_kredit": "Modal usaha",
    "createdAt": "2026-05-18T08:00:00.000Z",
    "updatedAt": "2026-05-25T14:30:00.000Z"
  }
}
```

### Contoh Response Error

**404 Not Found**

```json
{
  "error": "Gagal memperbarui, data pengajuan tidak ditemukan."
}
```

**400 Bad Request (Validasi)**

```json
{
  "error": [
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "string",
      "path": ["nominal"],
      "message": "Expected number, received string"
    }
  ]
}
```

**401 Unauthorized**

```json
{
  "error": "Token tidak valid atau tidak ada"
}
```

**403 Forbidden**

```json
{
  "error": "Anda tidak memiliki akses ke resource ini"
}
```

---

## Contoh Request Menggunakan JavaScript/Fetch (Admin Frontend)

### Get List Pengajuan

```javascript
const getListPengajuan = async (page = 1, limit = 10, search = "") => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await fetch(
      `http://localhost:5000/api/v1/pengajuan/listPengajuanAdmin?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal mengambil data");
    }

    return {
      success: true,
      metadata: result.metadata,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
```

### Get Detail Pengajuan

```javascript
const getDetailPengajuan = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/pengajuan/detailPengajuanAdmin/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal mengambil data");
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
```

### Update Pengajuan

```javascript
const updatePengajuan = async (id, updateData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/pengajuan/updatePengajuanAdmin/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Gagal memperbarui data");
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Contoh penggunaan update status menjadi "approved"
const result = await updatePengajuan(1, {
  status: "approved",
  nominal: 50000000,
  tenor: 24,
});

console.log(result);
```
