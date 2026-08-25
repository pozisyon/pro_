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
  AdminVisitService
} from '../../core/services/admin-visit.service';

import {
  AdminVisitResponse
} from '../../core/models/admin-visit';

import {
  AdminUserResponse
} from '../../core/models/admin-user';


@Component({
  selector: 'app-admin-visits',

  imports: [
    RouterLink,
    DatePipe,
    FormsModule
  ],

  templateUrl: './visits.html',

  styleUrl: './visits.css'
})
export class Visits implements OnInit {

  private readonly service =
    inject(AdminVisitService);


  visits: AdminVisitResponse[] = [];

  agents: AdminUserResponse[] = [];


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

          this.loadVisits();
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


  loadVisits(): void {

    this.service
      .findAllVisits()
      .subscribe({

        next: visits => {

          this.visits =
            visits;


          for (
            const visit of visits
            ) {

            this.selectedAgents[
              visit.id
              ] =
              visit.agentId;
          }


          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement visites',
            error
          );

          this.errorMessage =
            'Impossible de charger les visites.';

          this.loading =
            false;
        }

      });
  }


  assignAgent(
    visit: AdminVisitResponse
  ): void {

    const agentId =
      this.selectedAgents[
        visit.id
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
        visit.id,
        agentId
      )
      .subscribe({

        next: updatedVisit => {

          this.visits =
            this.visits.map(item =>

              item.id ===
              updatedVisit.id

                ? updatedVisit

                : item
            );


          this.successMessage =
            'Visite assignée avec succès.';
        },


        error: error => {

          console.error(
            'Erreur assignation visite',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible d’assigner cette visite.';
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

      case 'CONFIRMEE':
        return 'confirmed';

      case 'ANNULEE':
        return 'cancelled';

      case 'EFFECTUEE':
        return 'completed';

      case 'REPORTEE':
        return 'rescheduled';

      default:
        return 'pending';
    }
  }
}
