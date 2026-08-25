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
  Router,
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../core/auth/auth.service';


@Component({
  selector: 'app-register',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',

  styleUrl: './register.css'
})
export class Register {

  private readonly fb =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);


  submitting = false;

  errorMessage = '';


  registerForm =
    this.fb.nonNullable.group({

      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      prenom: [
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

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]

    });


  submit(): void {

    if (this.registerForm.invalid) {

      this.registerForm
        .markAllAsTouched();

      return;
    }


    const raw =
      this.registerForm.getRawValue();


    if (
      raw.password !==
      raw.confirmPassword
    ) {

      this.errorMessage =
        'Les mots de passe ne correspondent pas.';

      return;
    }


    this.submitting = true;

    this.errorMessage = '';


    const request = {

      nom:
        raw.nom.trim(),

      prenom:
        raw.prenom.trim(),

      email:
        raw.email.trim(),

      telephone:
        raw.telephone.trim(),

      password:
      raw.password

    };


    this.authService
      .register(request)
      .subscribe({

        next: response => {

          this.submitting =
            false;


          if (
            response.role === 'CLIENT'
          ) {

            this.router.navigate([
              '/client'
            ]);

            return;
          }


          this.router.navigate([
            '/'
          ]);
        },


        error: error => {

          console.error(
            'Erreur inscription',
            error
          );

          this.submitting =
            false;


          if (
            error.status === 409
          ) {

            this.errorMessage =
              'Un compte existe déjà avec cette adresse email.';

            return;
          }


          if (
            error.status === 400
          ) {

            this.errorMessage =
              error?.error?.message
              || 'Les informations saisies sont invalides.';

            return;
          }


          this.errorMessage =
            error?.error?.message
            || 'Impossible de créer le compte.';
        }

      });
  }
}
