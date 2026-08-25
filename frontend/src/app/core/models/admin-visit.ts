export interface AdminVisitResponse {

  id: number;

  propertyId: number;

  propertyReference: string;

  propertyTitle: string;

  clientId: number | null;

  agentId: number | null;

  nomVisiteur: string;

  email: string;

  telephone: string;

  dateVisite: string;

  nombrePersonnes: number;

  statut: string;

  commentaire: string | null;

  createdAt: string;
}
