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
  AdminAppointmentService
} from '../../core/services/admin-appointment.service';

import {
  AdminAppointmentResponse
} from '../../core/models/admin-appointment';

import {
  AdminUserResponse
} from '../../core/models/admin-user';


@Component({
  selector: 'app-admin-appointments',

  imports: [
    RouterLink,
    DatePipe,
    FormsModule
  ],

  templateUrl: './appointments.html',

  styleUrl: './appointments.css'
})
export class Appointments implements OnInit {

  private readonly service =
    inject(AdminAppointmentService);


  appointments:
    AdminAppointmentResponse[] = [];

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

          this.loadAppointments();
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


  loadAppointments(): void {

    this.service
      .findAllAppointments()
      .subscribe({

        next: appointments => {

          this.appointments =
            appointments;


          for (
            const appointment
            of appointments
            ) {

            this.selectedAgents[
              appointment.id
              ] =
              appointment.agentId;
          }


          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur chargement rendez-vous',
            error
          );

          this.errorMessage =
            'Impossible de charger les rendez-vous.';

          this.loading =
            false;
        }

      });
  }


  assignAgent(
    appointment:
    AdminAppointmentResponse
  ): void {

    const agentId =
      this.selectedAgents[
        appointment.id
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
        appointment.id,
        agentId
      )
      .subscribe({

        next: updated => {

          this.appointments =
            this.appointments.map(
              item =>

                item.id === updated.id
                  ? updated
                  : item
            );


          this.successMessage =
            'Rendez-vous assigné avec succès.';
        },


        error: error => {

          console.error(
            'Erreur assignation rendez-vous',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible d’assigner ce rendez-vous.';
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

      case 'CONFIRME':
        return 'confirmed';

      case 'ANNULE':
        return 'cancelled';

      case 'TERMINE':
        return 'completed';

      case 'REPORTE':
        return 'rescheduled';

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

      case 'DEMANDE':
        return 'Demandé';

      case 'CONFIRME':
        return 'Confirmé';

      case 'ANNULE':
        return 'Annulé';

      case 'TERMINE':
        return 'Terminé';

      case 'REPORTE':
        return 'Reporté';

      default:
        return statut;
    }
  }
}
