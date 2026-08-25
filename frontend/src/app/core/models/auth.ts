export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  nom: string;
  email: string;
  role: string;
}

export interface CurrentUser {
  userId: number;
  nom: string;
  email: string;
  role: string;
}
