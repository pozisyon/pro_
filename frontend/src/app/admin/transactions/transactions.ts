import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  DatePipe
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  AdminTransactionService
} from '../../core/services/admin-transaction.service';

import {
  AdminTransactionResponse
} from '../../core/models/admin-transaction';

import {
  AdminUserResponse
} from '../../core/models/admin-user';


@Component({
  selector: 'app-admin-transactions',

  imports: [
    RouterLink,
    DatePipe,
    FormsModule
  ],

  templateUrl: './transactions.html',

  styleUrl: './transactions.css'
})
export class Transactions implements OnInit {

  private readonly service =
    inject(AdminTransactionService);


  transactions:
    AdminTransactionResponse[] = [];

  agents:
    AdminUserResponse[] = [];


  selectedAgents:
    Record<number, number | null> = {};


  loading = true;

  errorMessage = '';

  successMessage = '';


  ngOnInit(): void {

    this.loadData();
  }


  loadData(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findAgents()
      .subscribe({

        next: agents => {

          this.agents =
            agents;

          this.loadTransactions();
        },


        error: error => {

          console.error(
            'Erreur chargement agents',
            error
          );

          this.errorMessage =
            'Impossible de charger les agents.';

          this.loading =
            false;
        }

      });
  }


  loadTransactions(): void {

    this.service
      .findAllTransactions()
      .subscribe({

        next: transactions => {

          this.transactions =
            transactions;


          for (
            const transaction
            of transactions
            ) {

            this.selectedAgents[
              transaction.id
              ] =
              transaction.agentId;
          }


          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement transactions',
            error
          );

          this.errorMessage =
            'Impossible de charger les transactions.';

          this.loading =
            false;
        }

      });
  }


  assignAgent(
    transaction:
    AdminTransactionResponse
  ): void {

    const agentId =
      this.selectedAgents[
        transaction.id
        ];


    if (!agentId) {

      this.errorMessage =
        'Sélectionnez un agent.';

      return;
    }


    this.errorMessage = '';

    this.successMessage = '';


    this.service
      .assignAgent(
        transaction.id,
        agentId
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


          this.successMessage =
            'Transaction assignée avec succès.';
        },


        error: error => {

          console.error(
            'Erreur assignation transaction',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible d’assigner cette transaction.';
        }

      });
  }


  getAgentName(
    agentId: number | null
  ): string {

    if (!agentId) {

      return 'Non assigné';
    }


    const agent =
      this.agents.find(
        item =>
          item.id === agentId
      );


    if (!agent) {

      return 'Agent inconnu';
    }


    return `${agent.prenom ?? ''} ${agent.nom}`.trim();
  }


  getStatusClass(
    statut: string
  ): string {

    switch (
      statut?.toUpperCase()
      ) {

      case 'EN_NEGOCIATION':
        return 'negotiation';

      case 'EN_ATTENTE':
        return 'pending';

      case 'CONFIRMEE':
      case 'CONFIRME':
        return 'confirmed';

      case 'TERMINEE':
      case 'TERMINE':
        return 'completed';

      case 'ANNULEE':
      case 'ANNULE':
        return 'cancelled';

      default:
        return 'pending';
    }
  }


  getStatusLabel(
    statut: string
  ): string {

    switch (
      statut?.toUpperCase()
      ) {

      case 'EN_NEGOCIATION':
        return 'En négociation';

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
        return statut;
    }
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
}
