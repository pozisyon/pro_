// src/app/core/models/admin-user.ts

export interface AdminUserResponse {
  id: number;
  roleId: number;
  roleCode: string;
  roleNom: string;
  nom: string;
  prenom: string | null;
  email: string;
  telephone: string | null;
  actif: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
}
