export interface PaymentResponse {

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
