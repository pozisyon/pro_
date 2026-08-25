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
  AgentAppointmentService
} from '../../core/services/agent-appointment.service';

import {
  AppointmentResponse
} from '../../core/models/appointment';


@Component({
  selector: 'app-agent-appointments',

  imports: [
    DatePipe,
    RouterLink
  ],

  templateUrl: './appointments.html',

  styleUrl: './appointments.css'
})
export class Appointments implements OnInit {

  private readonly service =
    inject(AgentAppointmentService);


  appointments:
    AppointmentResponse[] = [];

  loading = true;

  errorMessage = '';


  ngOnInit(): void {

    this.loadAppointments();
  }


  loadAppointments(): void {

    this.loading = true;

    this.errorMessage = '';


    this.service
      .findMyAppointments()
      .subscribe({

        next: appointments => {

          this.appointments =
            appointments;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur rendez-vous agent',
            error
          );

          this.errorMessage =
            'Impossible de charger vos rendez-vous.';

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

      case 'DEMANDE':
        return 'Demandé';

      case 'CONFIRME':
        return 'Confirmé';

      case 'REPORTE':
        return 'Reporté';

      case 'ANNULE':
        return 'Annulé';

      case 'TERMINE':
        return 'Terminé';

      default:
        return statut;
    }
  }
  updateStatus(
    appointment: AppointmentResponse,
    statut: string
  ): void {

    this.errorMessage = '';

    this.service
      .updateStatus(
        appointment.id,
        statut
      )
      .subscribe({

        next: updated => {

          this.appointments =
            this.appointments.map(item =>

              item.id === updated.id
                ? updated
                : item
            );
        },

        error: error => {

          console.error(
            'Erreur mise à jour rendez-vous',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de modifier le statut du rendez-vous.';
        }

      });
  }
}
