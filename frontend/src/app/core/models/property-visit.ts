export interface CreatePropertyVisitRequest {

  nomVisiteur: string;

  email: string;

  telephone: string;

  dateVisite: string;

  nombrePersonnes: number;

  commentaire?: string;
}


export interface PropertyVisitResponse {

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

  commentaire?: string;

  createdAt: string;
}
