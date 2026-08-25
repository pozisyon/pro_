// src/app/core/models/admin-transaction.ts

export interface AdminTransactionResponse {
  id: number;

  reference: string;

  propertyId: number;
  propertyReference: string;
  propertyTitle: string;

  clientId: number | null;
  agentId: number | null;

  typeTransaction: string;

  montant: number;
  devise: string;

  statut: string;

  dateTransaction: string | null;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
}
