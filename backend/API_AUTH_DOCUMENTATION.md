# API Authentication Documentation

## Base URL

```
http://localhost:5000/api/v1
```

## Authentication Endpoints

### 1. Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and return access/refresh tokens

**Request Body:**

```json
{
  "email": "string (email format)",
  "password": "string (min 6 characters)"
}
```

**Response (Success - 200):**

```json
{
  "message": "Login berhasil",
  "data": {
    "accessToken": "jwt_access_token_string",
    "refreshToken": "jwt_refresh_token_string"
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "Email tidak ditemukan" | "Password salah" | "Login gagal"
}
```

**Cookies Set:**

- `accessToken`: Expires in 15 minutes
- `refreshToken`: Expires in 7 days

**Example Request (cURL):**

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

### 2. Refresh Token

**Endpoint:** `POST /auth/refresh-token`
**Description:** Generate new access token using refresh token
**Authentication:** Required (refresh token from cookies)
**Request Body:** None
**Response (Success - 200):**

```json
{
  "message": "Token berhasil diperbarui"
}
```
**Response (Error - 400/401):**

```json
{
  "error": "Refresh token tidak ditemukan" | "Invalid refresh token" | "Gagal refresh token"
}
```

**Cookies Set:**
- `accessToken`: New token, expires in 15 minutes
**Example Request (cURL):**
```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh-token \
  -H "Cookie: refreshToken=your_refresh_token_here"
```
---

### 3. Logout
**Endpoint:** `POST /auth/logout`
**Description:** Logout user and invalidate refresh token
**Authentication:** Required (access token in cookies or Authorization header)
**Request Body:** None
**Response (Success - 200):**
```json
{
  "message": "Logout berhasil"
}
```
**Response (Error - 400/401):**
```json
{
  "error": "Refresh token tidak ditemukan" | "Logout gagal"
}
```

**Cookies Cleared:**
- `accessToken`
- `refreshToken`
**Example Request (cURL):**

```bash
# Using cookies
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Cookie: accessToken=your_access_token_here; refreshToken=your_refresh_token_here"
# Using Authorization header
curl -X POST http://localhost:5000/api/v1/auth/logout \
  -H "Authorization: Bearer your_access_token_here"
```

---
## Frontend Integration Guide
### 1. Login Implementation
```javascript
const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important: Include cookies
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Tokens are automatically stored in cookies
      console.log("Login successful:", data.message);
      return { success: true, data: data.data };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    return { success: false, error: error.message };
  }
};
```

### 2. Refresh Token Implementation

```javascript
const refreshAccessToken = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include", // Include refresh token cookie
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Token refreshed:", data.message);
      return { success: true };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Token refresh failed:", error.message);
    return { success: false, error: error.message };
  }
};
```

### 3. Logout Implementation

```javascript
const logout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include", // Include access token cookie
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Logout successful:", data.message);
      // Cookies are automatically cleared by server
      return { success: true };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
    return { success: false, error: error.message };
  }
};
```

### 4. Making Authenticated Requests

```javascript
const makeAuthenticatedRequest = async (url, options = {}) => {
  const defaultOptions = {
    credentials: "include", // Include cookies with request
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  let response = await fetch(url, defaultOptions);

  // If access token expired, try to refresh and retry request
  if (response.status === 401) {
    const refreshResult = await refreshAccessToken();
    if (refreshResult.success) {
      response = await fetch(url, defaultOptions);
    }
  }

  return response;
};

// Usage example
const getUserProfile = async () => {
  try {
    const response = await makeAuthenticatedRequest(
      "http://localhost:5000/api/v1/users/profile",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get user profile:", error);
  }
};
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation errors, missing data)
- `401`: Unauthorized (invalid/missing tokens)
- `500`: Internal Server Error

Always check `response.ok` and handle errors appropriately in your frontend code.

## Security Notes

1. Always use HTTPS in production
2. Store sensitive tokens securely (HTTP-only cookies are handled automatically)
3. Implement token refresh logic to maintain user sessions
4. Handle token expiration gracefully
5. Clear local state on logout</content>
   <parameter name="filePath">c:\amat\6\magang\Project magang\project-2\frontend-client\backend\API_AUTH_DOCUMENTATION.md
