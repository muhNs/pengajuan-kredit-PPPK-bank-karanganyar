# API Instansi Master Documentation

## Overview

API Instansi Master adalah endpoint untuk mengelola data instansi/organisasi dalam sistem. Semua endpoint dilindungi dengan autentikasi dan otorisasi (hanya admin yang dapat mengakses).

## Base URL

```
http://localhost:5000/api/v1/instansi
```

## Authentication

Semua endpoint memerlukan:

- **Authentication**: User harus sudah login
- **Authorization**: Hanya user dengan role `ADMIN` yang dapat mengakses

Sertakan cookies atau Authorization header dalam setiap request:

```
Cookie: accessToken=your_access_token
// atau
Authorization: Bearer your_access_token
```

---

## Data Model

### Instansi Schema

Struktur data untuk Instansi:

| Field               | Type    | Deskripsi                            | Validasi                |
| ------------------- | ------- | ------------------------------------ | ----------------------- |
| `id`                | Integer | ID unik Instansi (auto-increment)    | -                       |
| `nama_instansi`     | String  | Nama instansi/organisasi             | Min 3 karakter, Max 255 |
| `alamat_instansi`   | String  | Alamat lengkap instansi              | Min 5 karakter          |
| `nama_kepala_dinas` | String  | Nama Kepala Dinas/Pimpinan           | Min 3 karakter, Max 255 |
| `nip_kepala_dinas`  | String  | Nomor Identitas Pegawai Kepala Dinas | Min 5 karakter, Max 100 |
| `nama_bendahara`    | String  | Nama Bendahara/Keuangan              | Min 3 karakter, Max 255 |
| `nip_bendahara`     | String  | Nomor Identitas Pegawai Bendahara    | Min 5 karakter, Max 100 |

---

## Endpoints

### 1. GET - Retrieve All Instansi

**Endpoint:** `GET /instansi/getAllInstansi`

**Description:** Mengambil semua data instansi yang tersedia

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Query Parameters:** None

**Request Body:** None

**Response (Success - 200):**

```json
[
  {
    "id": 1,
    "nama_instansi": "Dinas Pendidikan Kota Jakarta",
    "alamat": "Jl. Menteng Raya No. 50, Jakarta Pusat",
    "nama_kepala_dinas": "Dr. Ahmad Wijaya",
    "nip_kepala_dinas": "197503152000121001",
    "nama_bendahara_dinas": "Siti Nurhaliza",
    "nip_bendahara_dinas": "198201102005022003"
  },
  {
    "id": 2,
    "nama_instansi": "Dinas Kesehatan Provinsi Jawa Barat",
    "alamat": "Jl. Diponegoro No. 123, Bandung",
    "nama_kepala_dinas": "Prof. Bambang Sutrisno",
    "nip_kepala_dinas": "196412201990031001",
    "nama_bendahara_dinas": "Rina Kusuma",
    "nip_bendahara_dinas": "197805152002032005"
  }
]
```

**Response (Error - 500):**

```json
{
  "error": "Gagal mengambil data instansi"
}
```

**Example Request (cURL):**

```bash
curl -X GET http://localhost:5000/api/v1/instansi/getAllInstansi \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token"
```

**Example Request (JavaScript Fetch):**

```javascript
const getAllInstansi = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/instansi/getAllInstansi",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Data retrieved:", data);
      return { success: true, data: data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to retrieve data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
getAllInstansi();
```

---

### 2. GET - Retrieve Instansi by ID

**Endpoint:** `GET /instansi/getInstansiById/:id`

**Description:** Mengambil data instansi berdasarkan ID

**Path Parameters:**

- `id` (required): ID instansi yang ingin diambil (integer)

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Request Body:** None

**Response (Success - 200):**

```json
{
  "id": 1,
  "nama_instansi": "Dinas Pendidikan Kota Jakarta",
  "alamat": "Jl. Menteng Raya No. 50, Jakarta Pusat",
  "nama_kepala_dinas": "Dr. Ahmad Wijaya",
  "nip_kepala_dinas": "197503152000121001",
  "nama_bendahara_dinas": "Siti Nurhaliza",
  "nip_bendahara_dinas": "198201102005022003"
}
```

**Response (Error - 500):**

```json
{
  "error": "Gagal mengambil data instansi"
}
```

**Example Request (cURL):**

```bash
curl -X GET http://localhost:5000/api/v1/instansi/getInstansiById/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token"
```

**Example Request (JavaScript Fetch):**

```javascript
const getInstansiById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/instansi/getInstansiById/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Data retrieved:", data);
      return { success: true, data: data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to retrieve data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
getInstansiById(1);
```

---

### 3. POST - Create New Instansi

**Endpoint:** `POST /instansi/createInstansi`

**Description:** Membuat data instansi baru

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Request Body:**

```json
{
  "nama_instansi": "string (min 3 karakter, max 255)",
  "alamat_instansi": "string (min 5 karakter)",
  "nama_kepala_dinas": "string (min 3 karakter, max 255)",
  "nip_kepala_dinas": "string (min 5 karakter, max 100)",
  "nama_bendahara": "string (min 3 karakter, max 255)",
  "nip_bendahara": "string (min 5 karakter, max 100)"
}
```

**Response (Success - 201):**

```json
{
  "id": 3,
  "nama_instansi": "Dinas Sosial Kabupaten Bogor",
  "alamat": "Jl. Ahmad Yani No. 45, Bogor",
  "nama_kepala_dinas": "Ir. Suwarno Handoko",
  "nip_kepala_dinas": "196108151988031002",
  "nama_bendahara_dinas": "Dewi Lestari",
  "nip_bendahara_dinas": "197910202003032001"
}
```

**Response (Error - 400):**

```json
{
  "error": "Gagal membuat data instansi"
}
```

**Response (Error - 409 - Duplicate):**

```json
{
  "error": "Instansi dengan nama tersebut sudah ada"
}
```

**Example Request (cURL):**

```bash
curl -X POST http://localhost:5000/api/v1/instansi/createInstansi \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token" \
  -d '{
    "nama_instansi": "Dinas Sosial Kabupaten Bogor",
    "alamat_instansi": "Jl. Ahmad Yani No. 45, Bogor",
    "nama_kepala_dinas": "Ir. Suwarno Handoko",
    "nip_kepala_dinas": "196108151988031002",
    "nama_bendahara": "Dewi Lestari",
    "nip_bendahara": "197910202003032001"
  }'
```

**Example Request (JavaScript Fetch):**

```javascript
const createInstansi = async (instansiData) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/instansi/createInstansi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(instansiData),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Instansi created:", data);
      return { success: true, data: data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to create instansi:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
const newInstansi = {
  nama_instansi: "Dinas Sosial Kabupaten Bogor",
  alamat_instansi: "Jl. Ahmad Yani No. 45, Bogor",
  nama_kepala_dinas: "Ir. Suwarno Handoko",
  nip_kepala_dinas: "196108151988031002",
  nama_bendahara: "Dewi Lestari",
  nip_bendahara: "197910202003032001",
};

createInstansi(newInstansi);
```

---

### 4. PUT - Update Instansi

**Endpoint:** `PUT /instansi/updateInstansi/:id`

**Description:** Mengupdate data instansi yang sudah ada

**Path Parameters:**

- `id` (required): ID instansi yang ingin diupdate (integer)

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Request Body:** (Semua field opsional)

```json
{
  "nama_instansi": "string (min 3 karakter, max 255)",
  "alamat_instansi": "string (min 5 karakter)",
  "nama_kepala_dinas": "string (min 3 karakter, max 255)",
  "nip_kepala_dinas": "string (min 5 karakter, max 100)",
  "nama_bendahara": "string (min 3 karakter, max 255)",
  "nip_bendahara": "string (min 5 karakter, max 100)"
}
```

**Response (Success - 200):**

```json
{
  "id": 1,
  "nama_instansi": "Dinas Pendidikan Kota Jakarta Pusat",
  "alamat": "Jl. Menteng Raya No. 50, Jakarta Pusat",
  "nama_kepala_dinas": "Dr. Ahmad Wijaya, M.Pd",
  "nip_kepala_dinas": "197503152000121001",
  "nama_bendahara_dinas": "Siti Nurhaliza, S.E.",
  "nip_bendahara_dinas": "198201102005022003"
}
```

**Response (Error - 404):**

```json
{
  "error": "Gagal mengupdate data instansi"
}
```

**Example Request (cURL):**

```bash
curl -X PUT http://localhost:5000/api/v1/instansi/updateInstansi/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token" \
  -d '{
    "nama_instansi": "Dinas Pendidikan Kota Jakarta Pusat",
    "nama_kepala_dinas": "Dr. Ahmad Wijaya, M.Pd"
  }'
```

**Example Request (JavaScript Fetch):**

```javascript
const updateInstansi = async (id, updateData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/instansi/updateInstansi/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(updateData),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Instansi updated:", data);
      return { success: true, data: data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to update instansi:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
const updateData = {
  nama_instansi: "Dinas Pendidikan Kota Jakarta Pusat",
  nama_kepala_dinas: "Dr. Ahmad Wijaya, M.Pd",
};

updateInstansi(1, updateData);
```

---

### 5. DELETE - Delete Instansi

**Endpoint:** `DELETE /instansi/deleteInstansi/:id`

**Description:** Menghapus data instansi

**Path Parameters:**

- `id` (required): ID instansi yang ingin dihapus (integer)

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Request Body:** None

**Response (Success - 200):**

```json
{
  "message": "Data instansi berhasil dihapus"
}
```

**Response (Error - 400):**

```json
{
  "error": "ID instansi tidak valid"
}
```

**Response (Error - 404):**

```json
{
  "error": "Gagal menghapus data instansi"
}
```

**Example Request (cURL):**

```bash
curl -X DELETE http://localhost:5000/api/v1/instansi/deleteInstansi/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token"
```

**Example Request (JavaScript Fetch):**

```javascript
const deleteInstansi = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/instansi/deleteInstansi/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Instansi deleted:", data.message);
      return { success: true, message: data.message };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to delete instansi:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
deleteInstansi(1);
```

---

## Validation Rules

Semua input harus memenuhi validasi berikut:

### Required Fields

- `nama_instansi` - **Wajib diisi**
  - Minimal 3 karakter
  - Maksimal 255 karakter
  - Harus unik (tidak boleh duplikat)

- `alamat_instansi` - **Wajib diisi**
  - Minimal 5 karakter
  - Dapat berisi format alamat lengkap

- `nama_kepala_dinas` - **Wajib diisi**
  - Minimal 3 karakter
  - Maksimal 255 karakter

- `nip_kepala_dinas` - **Wajib diisi**
  - Minimal 5 karakter
  - Maksimal 100 karakter

- `nama_bendahara` - **Wajib diisi**
  - Minimal 3 karakter
  - Maksimal 255 karakter

- `nip_bendahara` - **Wajib diisi**
  - Minimal 5 karakter
  - Maksimal 100 karakter

### On Update

- Semua field bersifat **opsional** saat melakukan update
- Hanya field yang dikirimkan yang akan diupdate

---

## Error Handling

### Common HTTP Status Codes

| Status | Meaning      | Description                                     |
| ------ | ------------ | ----------------------------------------------- |
| 200    | OK           | Request berhasil                                |
| 201    | Created      | Resource berhasil dibuat                        |
| 400    | Bad Request  | Format request tidak valid atau parameter salah |
| 401    | Unauthorized | User tidak terautentikasi                       |
| 403    | Forbidden    | User tidak memiliki otorisasi (bukan ADMIN)     |
| 404    | Not Found    | Resource tidak ditemukan                        |
| 500    | Server Error | Error di server                                 |

### Error Response Format

```json
{
  "error": "Pesan error yang deskriptif"
}
```

---

## Best Practices

1. **Authentication**: Selalu sertakan token autentikasi yang valid dalam setiap request
2. **Validation**: Pastikan semua field memenuhi kriteria validasi sebelum mengirim request
3. **Error Handling**: Selalu handle error response dan tampilkan pesan yang user-friendly
4. **Unique Check**: Jika membuat instansi baru, pastikan nama_instansi belum ada di database
5. **ID Validation**: Pastikan ID yang dikirim adalah integer yang valid sebelum melakukan GET/PUT/DELETE

---

## Notes

- Semua endpoint hanya dapat diakses oleh user dengan role `ADMIN`
- Data akan ditampilkan dalam urutan terbaru di awal (DESC order by ID)
- Untuk melakukan update, minimal salah satu field harus dikirimkan
- Saat menghapus instansi, pastikan tidak ada data yang bergantung pada instansi tersebut
