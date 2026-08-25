import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  TransactionDocumentService
} from '../../core/services/transaction-document.service';

import {
  TransactionDocumentResponse
} from '../../core/models/transaction-document';

import {
  DatePipe
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../core/auth/auth.service';

import {
  VisitService
} from '../../core/services/visit.service';

import {
  AppointmentService
} from '../../core/services/appointment.service';

import {
  PropertyVisitResponse
} from '../../core/models/property-visit';

import {
  AppointmentResponse
} from '../../core/models/appointment';

import {
  TransactionService
} from '../../core/services/transaction.service';

import {
  TransactionResponse
} from '../../core/models/transaction';

import {
  PaymentService
} from '../../core/services/payment.service';

import {
  PaymentResponse
} from '../../core/models/payment';

@Component({
  selector: 'app-client-dashboard',

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private readonly authService =
    inject(AuthService);

  private readonly visitService =
    inject(VisitService);

  private readonly appointmentService =
    inject(AppointmentService);

  private readonly paymentService =
    inject(PaymentService);

  payments: PaymentResponse[] = [];

  loadingPayments = true;

  paymentsError = '';

  readonly currentUser =
    this.authService.currentUser;


  private readonly transactionService =
    inject(TransactionService);

  private readonly documentService =
    inject(TransactionDocumentService);


  documents: TransactionDocumentResponse[] = [];

  loadingDocuments = true;

  documentsError = '';


  transactions: TransactionResponse[] = [];

  loadingTransactions = true;

  transactionsError = '';

  visits: PropertyVisitResponse[] = [];

  appointments: AppointmentResponse[] = [];


  loadingVisits = true;

  loadingAppointments = true;


  visitsError = '';

  appointmentsError = '';


  ngOnInit(): void {

    this.loadVisits();

    this.loadAppointments();

    this.loadTransactions();
    this.loadDocuments();
    this.loadPayments();
  }

  loadPayments(): void {

    this.loadingPayments = true;

    this.paymentsError = '';


    this.paymentService
      .findMyPayments()
      .subscribe({

        next: payments => {

          this.payments =
            payments;

          this.loadingPayments =
            false;
        },

        error: error => {

          console.error(
            'Erreur chargement paiements',
            error
          );

          this.paymentsError =
            'Impossible de charger vos paiements.';

          this.loadingPayments =
            false;
        }

      });
  }

  getPaymentStatusLabel(
    status: string
  ): string {

    switch (
      status?.toUpperCase()
      ) {

      case 'PAYE':
        return 'Payé';

      case 'EN_ATTENTE':
        return 'En attente';

      case 'ECHEC':
        return 'Échec';

      case 'ANNULE':
        return 'Annulé';

      case 'REMBOURSE':
        return 'Remboursé';

      default:
        return status;
    }
  }

  loadDocuments(): void {

    this.loadingDocuments = true;

    this.documentsError = '';


    this.documentService
      .findMyDocuments()
      .subscribe({

        next: documents => {

          this.documents =
            documents;

          this.loadingDocuments =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement documents',
            error
          );

          this.documentsError =
            'Impossible de charger vos documents.';

          this.loadingDocuments =
            false;
        }

      });
  }

  loadTransactions(): void {

    this.loadingTransactions = true;

    this.transactionsError = '';


    this.transactionService
      .findMyTransactions()
      .subscribe({

        next: transactions => {

          console.log(
            'TRANSACTIONS CLIENT:',
            transactions
          );

          this.transactions =
            transactions;

          this.loadingTransactions =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement transactions',
            error
          );

          this.transactionsError =
            'Impossible de charger vos transactions.';

          this.loadingTransactions =
            false;
        }

      });
  }
  formatAmount(
    amount: number,
    currency: string
  ): string {

    return new Intl.NumberFormat(
      'fr-FR',
      {
        style: 'currency',
        currency:
          currency || 'USD'
      }
    ).format(amount);
  }
  getTransactionStatusLabel(
    status: string
  ): string {

    switch (
      status?.toUpperCase()
      ) {

      case 'EN_COURS':
        return 'En cours';

      case 'EN_ATTENTE':
        return 'En attente';

      case 'CONFIRMEE':
      case 'CONFIRME':
        return 'Confirmée';

      case 'TERMINEE':
      case 'TERMINE':
        return 'Terminée';

      case 'ANNULEE':
      case 'ANNULE':
        return 'Annulée';

      default:
        return status;
    }
  }

  loadVisits(): void {

    this.loadingVisits = true;

    this.visitsError = '';


    this.visitService
      .findMyVisits()
      .subscribe({

        next: visits => {

          this.visits =
            visits;

          this.loadingVisits =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement visites',
            error
          );

          this.visitsError =
            'Impossible de charger vos visites.';

          this.loadingVisits =
            false;
        }

      });
  }


  loadAppointments(): void {

    this.loadingAppointments = true;

    this.appointmentsError = '';


    this.appointmentService
      .findMyAppointments()
      .subscribe({

        next: appointments => {

          this.appointments =
            appointments;

          this.loadingAppointments =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement rendez-vous',
            error
          );

          this.appointmentsError =
            'Impossible de charger vos rendez-vous.';

          this.loadingAppointments =
            false;
        }

      });
  }


  getVisitStatusLabel(
    status: string
  ): string {

    switch (
      status?.toUpperCase()
      ) {

      case 'DEMANDEE':
      case 'DEMANDE':
        return 'Demandée';

      case 'CONFIRMEE':
      case 'CONFIRME':
        return 'Confirmée';

      case 'REPORTEE':
      case 'REPORTE':
        return 'Reportée';

      case 'ANNULEE':
      case 'ANNULE':
        return 'Annulée';

      case 'TERMINEE':
      case 'TERMINE':
        return 'Terminée';

      default:
        return status;
    }
  }


  getStatusClass(
    status: string
  ): string {

    const value =
      status?.toUpperCase();

    switch (value) {

      case 'CONFIRMEE':
      case 'CONFIRME':
        return 'confirmed';

      case 'ANNULEE':
      case 'ANNULE':
        return 'cancelled';

      case 'TERMINEE':
      case 'TERMINE':
        return 'completed';

      case 'REPORTEE':
      case 'REPORTE':
        return 'rescheduled';

      default:
        return 'pending';
    }
  }
}
