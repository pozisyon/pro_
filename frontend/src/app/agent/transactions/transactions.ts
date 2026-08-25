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
  AgentTransactionService
} from '../../core/services/agent-transaction.service';

import {
  TransactionResponse
} from '../../core/models/transaction';


@Component({
  selector: 'app-agent-transactions',

  imports: [
    RouterLink,
    DatePipe
  ],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  private readonly service =
    inject(AgentTransactionService);


  transactions:
    TransactionResponse[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadTransactions();
  }


  loadTransactions(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findMyTransactions()
      .subscribe({

        next: (
          transactions:
          TransactionResponse[]
        ) => {

          this.transactions =
            transactions;

          this.loading =
            false;
        },


        error: (
          error: unknown
        ) => {

          console.error(
            'Erreur transactions agent',
            error
          );

          this.errorMessage =
            'Impossible de charger vos transactions.';

          this.loading =
            false;
        }

      });
  }


  updateStatus(
    transaction: TransactionResponse,
    statut: string
  ): void {

    this.errorMessage = '';


    this.service
      .updateStatus(
        transaction.id,
        statut
      )
      .subscribe({

        next: updated => {

          this.transactions =
            this.transactions.map(
              item =>

                item.id === updated.id
                  ? updated
                  : item
            );
        },


        error: error => {

          console.error(
            'Erreur mise à jour transaction',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de modifier le statut de la transaction.';
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

      case 'EN_NEGOCIATION':
        return 'En négociation';

      case 'CONFIRMEE':
        return 'Confirmée';

      case 'TERMINEE':
        return 'Terminée';

      case 'ANNULEE':
        return 'Annulée';

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

      case 'EN_NEGOCIATION':
        return 'negotiation';

      case 'CONFIRMEE':
        return 'confirmed';

      case 'TERMINEE':
        return 'completed';

      case 'ANNULEE':
        return 'cancelled';

      default:
        return 'pending';
    }
  }
}
