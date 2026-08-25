// src/app/core/models/admin-payment.ts

export interface AdminPaymentResponse {

  id: number;

  transactionId: number;

  transactionReference: string;

  reference: string;

  montant: number;

  devise: string;

  modePaiement: string;

  statut: string;

  datePaiement: string | null;

  createdAt: string;
}
