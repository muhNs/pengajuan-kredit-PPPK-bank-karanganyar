# API Master CRUD Documentation

## Overview

API Master CRUD adalah endpoint untuk mengelola data master aplikasi. Semua endpoint dilindungi dengan autentikasi dan otorisasi (hanya admin yang dapat mengakses).

## Base URL

```
http://localhost:5000/api/v1/master
```

## Authentication

Semua endpoint memerlukan:

- **Authentication**: User harus sudah login
- **Authorization**: Hanya user dengan role `admin` yang dapat mengakses

Sertakan cookies atau Authorization header dalam setiap request:

```
Cookie: accessToken=your_access_token
// atau
Authorization: Bearer your_access_token
```

---

## Master Data Categories

Berikut adalah kategori master data yang tersedia:

| Kategori            | Deskripsi                | Field Database |
| ------------------- | ------------------------ | -------------- |
| `status-rumah`      | Status kepemilikan rumah | kepemilikan    |
| `status-pernikahan` | Status pernikahan        | status         |
| `jenis-kelamin`     | Jenis kelamin            | gender         |

---

## Endpoints

### 1. GET - Retrieve All Master Data

**Endpoint:** `GET /master/:kategori`

**Description:** Mengambil semua data untuk kategori tertentu

**Parameters:**

- `kategori` (path parameter): Salah satu dari kategori yang tersedia (lihat tabel di atas)

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Response (Success - 200):**

```json
{
  "message": "Berhasil mengambil data",
  "data": [
    {
      "id": 1,
      "kepemilikan": "Milik Sendiri"
      // atau "status": "Belum Menikah" / "gender": "Laki-laki"
      // tergantung kategori
    },
    {
      "id": 2,
      "kepemilikan": "Menumpang"
    }
  ]
}
```

**Response (Error - 404):**

```json
{
  "error": "Kategori master data tidak ditemukan"
}
```

**Example Request (cURL):**

```bash
curl -X GET http://localhost:5000/api/v1/master/status-rumah \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token"
```

**Example Request (JavaScript Fetch):**

```javascript
const getAllMasterData = async (kategori) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/master/${kategori}`,
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
      console.log("Data retrieved:", data.data);
      return { success: true, data: data.data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to retrieve data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
getAllMasterData("status-rumah");
```

---

### 2. POST - Create Master Data

**Endpoint:** `POST /master/:kategori`

**Description:** Membuat data master baru

**Parameters:**

- `kategori` (path parameter): Salah satu dari kategori yang tersedia

**Request Body:**

```json
{
  "nama": "string (min 2 characters)"
}
```

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Response (Success - 201):**

```json
{
  "message": "Data berhasil ditambahkan",
  "data": {
    "id": 3,
    "kepemilikan": "Nama Data Baru"
    // atau "status": "Nama Data Baru" / "gender": "Nama Data Baru"
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "[{\"code\":\"too_small\",\"minimum\":2,\"type\":\"string\",\"path\":[\"nama\"],\"message\":\"Nama minimal terdiri dari 2 karakter\"}]"
}
```

**Response (Error - 500):**

```json
{
  "error": "Gagal menambahkan data server"
}
```

**Validation Rules:**

- `nama`:
  - Type: string
  - Min length: 2 characters
  - Required: true

**Example Request (cURL):**

```bash
curl -X POST http://localhost:5000/api/v1/master/status-rumah \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token" \
  -d '{
    "nama": "Kontrak"
  }'
```

**Example Request (JavaScript Fetch):**

```javascript
const createMasterData = async (kategori, nama) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/master/${kategori}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nama }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Data created:", data.data);
      return { success: true, data: data.data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to create data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
createMasterData("status-rumah", "Kontrak");
```

---

### 3. PUT - Update Master Data

**Endpoint:** `PUT /master/:kategori/:id`

**Description:** Memperbarui data master yang ada

**Parameters:**

- `kategori` (path parameter): Salah satu dari kategori yang tersedia
- `id` (path parameter): ID dari data yang ingin diupdate (tipe: number)

**Request Body:**

```json
{
  "nama": "string (min 2 characters)"
}
```

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Response (Success - 200):**

```json
{
  "message": "Data berhasil diperbarui",
  "data": {
    "id": 1,
    "kepemilikan": "Nama Data Updated"
    // atau "status": "Nama Data Updated" / "gender": "Nama Data Updated"
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "[{\"code\":\"too_small\",\"minimum\":2,\"type\":\"string\",\"path\":[\"nama\"],\"message\":\"Nama minimal terdiri dari 2 karakter\"}]"
}
```

**Response (Error - 500):**

```json
{
  "error": "Gagal memperbarui data"
}
```

**Example Request (cURL):**

```bash
curl -X PUT http://localhost:5000/api/v1/master/status-rumah/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token" \
  -d '{
    "nama": "Milik Sendiri Updated"
  }'
```

**Example Request (JavaScript Fetch):**

```javascript
const updateMasterData = async (kategori, id, nama) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/master/${kategori}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nama }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Data updated:", data.data);
      return { success: true, data: data.data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to update data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
updateMasterData("status-rumah", 1, "Milik Sendiri Updated");
```

---

### 4. DELETE - Delete Master Data

**Endpoint:** `DELETE /master/:kategori/:id`

**Description:** Menghapus data master

**Parameters:**

- `kategori` (path parameter): Salah satu dari kategori yang tersedia
- `id` (path parameter): ID dari data yang ingin dihapus (tipe: number)

**Request Headers:**

```
Content-Type: application/json
Cookie: accessToken=your_token
// atau Authorization: Bearer your_token
```

**Response (Success - 200):**

```json
{
  "message": "Data berhasil dihapus"
}
```

**Response (Error - 500):**

```json
{
  "error": "Gagal menghapus data"
}
```

**Example Request (cURL):**

```bash
curl -X DELETE http://localhost:5000/api/v1/master/status-rumah/3 \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=your_access_token"
```

**Example Request (JavaScript Fetch):**

```javascript
const deleteMasterData = async (kategori, id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/master/${kategori}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Data deleted:", data.message);
      return { success: true };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Failed to delete data:", error.message);
    return { success: false, error: error.message };
  }
};

// Usage
deleteMasterData("status-rumah", 3);
```

---

## Complete Frontend Integration Example

### Setup Master Service

```javascript
// masterService.js
class MasterService {
  constructor(baseUrl = "http://localhost:5000/api/v1/master") {
    this.baseUrl = baseUrl;
  }

  async makeRequest(url, options = {}) {
    const defaultOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "An error occurred");
    }

    return await response.json();
  }

  // Get all master data by category
  async getAll(kategori) {
    try {
      const response = await this.makeRequest(`${this.baseUrl}/${kategori}`, {
        method: "GET",
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create new master data
  async create(kategori, nama) {
    try {
      const response = await this.makeRequest(`${this.baseUrl}/${kategori}`, {
        method: "POST",
        body: JSON.stringify({ nama }),
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update master data
  async update(kategori, id, nama) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/${kategori}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ nama }),
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete master data
  async delete(kategori, id) {
    try {
      const response = await this.makeRequest(
        `${this.baseUrl}/${kategori}/${id}`,
        {
          method: "DELETE",
        },
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new MasterService();
```

### Usage in React Component

```jsx
import { useEffect, useState } from "react";
import masterService from "./masterService";

export function MasterDataPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const kategori = "status-rumah";

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await masterService.getAll(kategori);
      if (result.success) {
        setData(result.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Create new item
  const handleCreate = async () => {
    if (!newItemName.trim() || newItemName.length < 2) {
      alert("Nama minimal 2 karakter");
      return;
    }

    const result = await masterService.create(kategori, newItemName);
    if (result.success) {
      setData([...data, result.data]);
      setNewItemName("");
      alert("Data berhasil ditambahkan");
    } else {
      alert("Gagal menambahkan data: " + result.error);
    }
  };

  // Update item
  const handleUpdate = async (id, newName) => {
    const result = await masterService.update(kategori, id, newName);
    if (result.success) {
      setData(data.map((item) => (item.id === id ? result.data : item)));
      alert("Data berhasil diperbarui");
    } else {
      alert("Gagal memperbarui data: " + result.error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const result = await masterService.delete(kategori, id);
      if (result.success) {
        setData(data.filter((item) => item.id !== id));
        alert("Data berhasil dihapus");
      } else {
        alert("Gagal menghapus data: " + result.error);
      }
    }
  };

  return (
    <div>
      <h1>Master Data - {kategori}</h1>

      <div className="form-group">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Masukkan nama baru"
        />
        <button onClick={handleCreate}>Tambah Data</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.kepemilikan || item.status || item.gender}</td>
                <td>
                  <button
                    onClick={() => {
                      const newName = prompt("Nama baru:");
                      if (newName) handleUpdate(item.id, newName);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

---

## Error Handling

### Common Errors and Solutions

| Status | Error                                          | Penyebab                         | Solusi                                                                      |
| ------ | ---------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| 400    | "Nama minimal terdiri dari 2 karakter"         | Input tidak sesuai validasi      | Validasi input di frontend sebelum dikirim                                  |
| 401    | Unauthorized                                   | Token tidak valid atau tidak ada | Login ulang atau refresh token                                              |
| 403    | Forbidden                                      | User bukan admin                 | Pastikan user memiliki role admin                                           |
| 404    | "Kategori master data tidak ditemukan"         | Kategori tidak valid             | Gunakan kategori yang benar: status-rumah, status-pernikahan, jenis-kelamin |
| 500    | "Gagal menambahkan/memperbarui/menghapus data" | Server error                     | Cek server logs                                                             |

---

## Testing with REST Client

Tambahkan request di bawah ke file `test.rest` untuk testing:

```rest
### Get all status rumah
GET http://localhost:5000/api/v1/master/status-rumah
Content-Type: application/json

### Create new status rumah
POST http://localhost:5000/api/v1/master/status-rumah
Content-Type: application/json

{
  "nama": "Kontrak"
}

### Update status rumah
PUT http://localhost:5000/api/v1/master/status-rumah/1
Content-Type: application/json

{
  "nama": "Milik Sendiri Updated"
}

### Delete status rumah
DELETE http://localhost:5000/api/v1/master/status-rumah/3
Content-Type: application/json
```

---

## Notes

1. Semua endpoint memerlukan autentikasi admin
2. ID adalah number, pastikan mengkonversi string dari URL ke number
3. Response format konsisten dengan struktur standard API
4. Gunakan credentials: 'include' di fetch untuk mengirim cookies
5. Validasi input di frontend untuk pengalaman user yang lebih baik
6. Handle error response dengan baik untuk debugging
