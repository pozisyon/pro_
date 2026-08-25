// src/app/core/models/admin-appointment.ts

export interface AdminAppointmentResponse {
  id: number;
  clientId: number | null;
  agentId: number | null;

  nomContact: string;
  email: string;
  telephone: string;

  sujet: string;

  dateDebut: string;
  dateFin: string | null;

  lieu: string;
  statut: string;
  notes: string | null;

  createdAt: string;
}
