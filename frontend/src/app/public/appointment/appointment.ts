import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  AppointmentService
} from '../../core/services/appointment.service';

@Component({
  selector: 'app-appointment',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl: './appointment.html',

  styleUrl: './appointment.css'
})
export class Appointment {

  private readonly fb =
    inject(FormBuilder);

  private readonly appointmentService =
    inject(AppointmentService);


  submitting = false;

  successMessage = '';

  errorMessage = '';


  appointmentForm =
    this.fb.nonNullable.group({

      nomContact: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      telephone: [
        '',
        [
          Validators.required
        ]
      ],

      sujet: [
        '',
        [
          Validators.required
        ]
      ],

      dateDebut: [
        '',
        [
          Validators.required
        ]
      ],

      dateFin: [
        ''
      ],

      lieu: [
        'Bureau NovaImmo - Jacmel'
      ],

      notes: [
        ''
      ]

    });


  submit(): void {

    if (
      this.appointmentForm.invalid
    ) {

      this.appointmentForm
        .markAllAsTouched();

      return;
    }


    this.submitting = true;

    this.successMessage = '';

    this.errorMessage = '';


    const formValue =
      this.appointmentForm
        .getRawValue();


    const request = {

      nomContact:
      formValue.nomContact,

      email:
      formValue.email,

      telephone:
      formValue.telephone,

      sujet:
      formValue.sujet,

      dateDebut:
      formValue.dateDebut,

      dateFin:
        formValue.dateFin || null,

      lieu:
      formValue.lieu,

      notes:
      formValue.notes

    };


    this.appointmentService
      .create(request)
      .subscribe({

        next: appointment => {

          this.submitting = false;

          this.successMessage =
            `Votre demande de rendez-vous a été enregistrée avec succès. Référence : ${appointment.id}`;

          this.appointmentForm.reset({

            nomContact: '',

            email: '',

            telephone: '',

            sujet: '',

            dateDebut: '',

            dateFin: '',

            lieu:
              'Bureau NovaImmo - Jacmel',

            notes: ''

          });
        },


        error: error => {

          console.error(
            'Erreur création rendez-vous',
            error
          );

          this.submitting = false;

          this.errorMessage =
            error?.error?.message
            || 'Impossible d’enregistrer votre rendez-vous.';
        }

      });
  }
}
