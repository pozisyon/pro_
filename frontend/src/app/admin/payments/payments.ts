import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  DatePipe
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  AdminPaymentService
} from '../../core/services/admin-payment.service';

import {
  AdminPaymentResponse
} from '../../core/models/admin-payment';


@Component({
  selector: 'app-admin-payments',

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './payments.html',

  styleUrl: './payments.css'
})
export class Payments implements OnInit {

  private readonly service =
    inject(AdminPaymentService);


  payments:
    AdminPaymentResponse[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadPayments();
  }


  loadPayments(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findAll()
      .subscribe({

        next: payments => {

          this.payments =
            payments;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement paiements admin',
            error
          );

          this.errorMessage =
            'Impossible de charger les paiements.';

          this.loading =
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


  getStatusLabel(
    statut: string
  ): string {

    switch (
      statut?.toUpperCase()
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
        return statut;
    }
  }


  getStatusClass(
    statut: string
  ): string {

    switch (
      statut?.toUpperCase()
      ) {

      case 'PAYE':
        return 'paid';

      case 'EN_ATTENTE':
        return 'pending';

      case 'ECHEC':
        return 'failed';

      case 'ANNULE':
        return 'cancelled';

      case 'REMBOURSE':
        return 'refunded';

      default:
        return 'pending';
    }
  }
}
