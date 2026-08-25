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
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  private readonly fb =
    inject(FormBuilder);

  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);


  submitting = false;

  errorMessage = '';


  /*
   * Formulaire de connexion
   */
  loginForm =
    this.fb.nonNullable.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });


  /*
   * Soumission du formulaire
   */
  submit(): void {

    /*
     * Vérification du formulaire
     */
    if (this.loginForm.invalid) {

      this.loginForm
        .markAllAsTouched();

      return;
    }


    this.submitting = true;

    this.errorMessage = '';


    /*
     * Récupération des valeurs
     * du formulaire.
     */
    const raw =
      this.loginForm.getRawValue();


    /*
     * DEBUG TEMPORAIRE
     *
     * On n'affiche jamais directement
     * le mot de passe dans la console.
     */
    console.log(
      'EMAIL BRUT:',
      JSON.stringify(raw.email)
    );

    console.log(
      'PASSWORD LENGTH BRUT:',
      raw.password.length
    );


    /*
     * Nettoyage des données.
     */
    const credentials = {

      email:
        raw.email.trim(),

      password:
        raw.password.trim()

    };


    /*
     * DEBUG APRÈS NETTOYAGE
     */
    console.log(
      'EMAIL ENVOYE:',
      JSON.stringify(
        credentials.email
      )
    );

    console.log(
      'PASSWORD LENGTH:',
      credentials.password.length
    );

    console.log(
      'PASSWORD EST 123456:',
      credentials.password === '123456'
    );


    /*
     * Appel de l'API Spring Boot.
     */
    this.authService
      .login(credentials)
      .subscribe({

        /*
         * ============================
         * CONNEXION RÉUSSIE
         * ============================
         */
        next: response => {

          this.submitting = false;


          console.log(
            'Connexion réussie pour:',
            response.email
          );

          console.log(
            'Rôle:',
            response.role
          );


          /*
           * Redirection selon le rôle.
           */
          switch (
            response.role
            ) {

            case 'ADMIN':

              this.router.navigate([
                '/admin'
              ]);

              break;


            case 'AGENT':

              this.router.navigate([
                '/agent'
              ]);

              break;


            case 'CLIENT':

              this.router.navigate([
                '/client'
              ]);

              break;


            default:

              this.router.navigate([
                '/'
              ]);

              break;
          }

        },


        /*
         * ============================
         * ERREUR DE CONNEXION
         * ============================
         */
        error: error => {

          console.error(
            'Erreur login',
            error
          );


          this.submitting = false;


          /*
           * 401 :
           * mauvais email ou mot de passe.
           */
          if (
            error.status === 401
          ) {

            this.errorMessage =
              'Email ou mot de passe incorrect.';

            return;
          }


          /*
           * 0 :
           * API inaccessible / problème réseau.
           */
          if (
            error.status === 0
          ) {

            this.errorMessage =
              'Impossible de contacter le serveur.';

            return;
          }


          /*
           * Autres erreurs.
           */
          this.errorMessage =
            error?.error?.message
            ||
            'Une erreur est survenue lors de la connexion.';
        }

      });
  }
}
