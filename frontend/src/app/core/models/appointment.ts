export interface CreateAppointmentRequest {

  nomContact: string;

  email: string;

  telephone: string;

  sujet: string;

  dateDebut: string;

  dateFin?: string | null;

  lieu?: string;

  notes?: string;
}


export interface AppointmentResponse {

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

  notes: string;

  createdAt: string;
}
