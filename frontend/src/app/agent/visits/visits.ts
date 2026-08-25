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
  AgentVisitService
} from '../../core/services/agent-visit.service';

import {
  PropertyVisitResponse
} from '../../core/models/property-visit';


@Component({
  selector: 'app-agent-visits',

  imports: [
    DatePipe,
    RouterLink
  ],

  templateUrl: './visits.html',

  styleUrl: './visits.css'
})
export class Visits implements OnInit {

  private readonly service =
    inject(AgentVisitService);


  visits: PropertyVisitResponse[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadVisits();
  }


  loadVisits(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findMyVisits()
      .subscribe({

        next: visits => {

          this.visits =
            visits;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur visites agent',
            error
          );

          this.errorMessage =
            'Impossible de charger vos visites.';

          this.loading =
            false;
        }

      });
  }


  getStatusLabel(
    statut: string
  ): string {

    switch (
      statut?.toUpperCase()
      ) {

      case 'DEMANDEE':
        return 'Demandée';

      case 'CONFIRMEE':
        return 'Confirmée';

      case 'REPORTEE':
        return 'Reportée';

      case 'ANNULEE':
        return 'Annulée';

      case 'EFFECTUEE':
        return 'Effectuée';

      default:
        return statut;
    }
  }
  updateStatus(
    visit: PropertyVisitResponse,
    statut: string
  ): void {

    this.errorMessage = '';

    this.service
      .updateStatus(
        visit.id,
        statut
      )
      .subscribe({

        next: updated => {

          this.visits =
            this.visits.map(item =>

              item.id === updated.id
                ? updated
                : item
            );
        },

        error: error => {

          console.error(
            'Erreur mise à jour visite',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de modifier le statut de la visite.';
        }

      });
  }
}
