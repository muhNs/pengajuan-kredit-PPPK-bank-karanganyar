# API Documentation: Users API

## Base URL

```
http://localhost:5000/api/v1/users
```

## Authentication

Semua endpoint Users API memerlukan autentikasi.

- Gunakan cookie `accessToken` yang diset saat login,
- atau header `Authorization: Bearer <token>`.
- Untuk fetch di browser, gunakan `credentials: 'include'` jika memakai cookie.

---

## Endpoints

### 1. Get Profile

- **Method:** GET
- **URL:** `/users/profile`
- **Access:** `ADMIN`, `CS`
- **Description:** Mengambil data profil pengguna yang sedang login.

**Request headers**

```http
Content-Type: application/json
Cookie: accessToken=<your_access_token>
```

**Success response (200)**

```json
{
  "id": 1,
  "username": "ADMIN",
  "email": "adminsuper@gmail.com",
  "role": "admin",
  "createdAt": "2026-05-14T12:34:56.000Z"
}
```

**Error responses**

- `401 Unauthorized` - token hilang atau tidak valid
- `404 Not Found` - profil tidak ditemukan
- `500 Internal Server Error`

**Frontend example**

```javascript
const getProfile = async () => {
  const res = await fetch("http://localhost:5000/api/v1/users/profile", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
```

---

### 2. Get All Users

- **Method:** GET
- **URL:** `/users/getAllUsers`
- **Access:** `ADMIN`
- **Description:** Mengambil daftar semua pengguna.

**Success response (200)**

```json
{
  "message": "Berhasil mengambil data pengguna",
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  ]
}
```

**Frontend example**

```javascript
const getAllUsers = async () => {
  const res = await fetch("http://localhost:5000/api/v1/users/getAllUsers", {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
```

---

### 3. Create User

- **Method:** POST
- **URL:** `/users/createUser`
- **Access:** `ADMIN`
- **Description:** Menambahkan pengguna baru.

**Request body**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN" // atau CS
}
```

**Success response (201)**

```json
{
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 5,
    "username": "newuser",
    "email": "newuser@example.com",
    "role": "CS"
  }
}
```

**Frontend example**

```javascript
const createUser = async (user) => {
  const res = await fetch("http://localhost:5000/api/v1/users/createUser", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};
```

---

### 4. Update User

- **Method:** PUT
- **URL:** `/users/updateUser/:id`
- **Access:** `ADMIN`
- **Description:** Memperbarui data pengguna berdasarkan ID.

**Path parameter**

- `id` (integer) — ID pengguna yang akan diupdate.

**Request body**

```json
{
  "username": "string",
  "email": "string",
  "role": "ADMIN" // atau CS
}
```

**Success response (200)**

```json
{
  "message": "Pengguna berhasil diperbarui",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Frontend example**

```javascript
const updateUser = async (id, updateData) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/users/updateUser/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    },
  );
  return res.json();
};
```

---

### 5. Delete User

- **Method:** DELETE
- **URL:** `/users/deleteUser/:id`
- **Access:** `ADMIN`
- **Description:** Menghapus pengguna berdasarkan ID.

**Success response (200)**

```json
{ "message": "Pengguna berhasil dihapus" }
```

**Frontend example**

```javascript
const deleteUser = async (id) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/users/deleteUser/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
  );
  return res.json();
};
```

---

## Catatan singkat

- Semua endpoint berada di bawah `/api/v1/users`.
- Profil menggunakan `GET /users/profile` dan dapat diakses oleh `ADMIN` dan `CS`.
- Endpoint lain hanya untuk `ADMIN`.
- Gunakan `credentials: 'include'` jika memakai cookie, atau `Authorization: Bearer <token>` untuk header.
- Response JSON biasanya berisi `message` dan `data` kecuali `profile` yang langsung mengembalikan objek user.
