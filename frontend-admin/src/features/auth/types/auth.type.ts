export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface UserProfile {
  id?: number | string;
  email: string;
  username?: string;
  role?: string;
  // Tambahkan field lain sesuai balikan data dari endpoint /users/profile nantinya
}