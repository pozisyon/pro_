import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  AdminUserService
} from '../../core/services/admin-user.service';

import {
  AdminUserResponse
} from '../../core/models/admin-user';


@Component({
  selector: 'app-admin-users',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './users.html',

  styleUrl: './users.css'
})
export class Users implements OnInit {

  private readonly adminUserService =
    inject(AdminUserService);

  private readonly fb =
    inject(FormBuilder);


  users: AdminUserResponse[] = [];

  loading = true;

  errorMessage = '';

  successMessage = '';

  showCreateAgent = false;

  submitting = false;


  agentForm =
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
      ]

    });


  ngOnInit(): void {

    this.loadUsers();
  }


  loadUsers(): void {

    this.loading = true;

    this.errorMessage = '';


    this.adminUserService
      .findAll()
      .subscribe({

        next: users => {

          this.users =
            users;

          this.loading =
            false;
        },

        error: error => {

          console.error(
            'Erreur utilisateurs admin',
            error
          );

          this.errorMessage =
            'Impossible de charger les utilisateurs.';

          this.loading =
            false;
        }

      });
  }


  toggleCreateAgent(): void {

    this.showCreateAgent =
      !this.showCreateAgent;

    this.successMessage = '';

    this.errorMessage = '';
  }


  createAgent(): void {

    if (this.agentForm.invalid) {

      this.agentForm
        .markAllAsTouched();

      return;
    }


    this.submitting = true;

    this.errorMessage = '';

    this.successMessage = '';


    const raw =
      this.agentForm.getRawValue();


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


    this.adminUserService
      .createAgent(request)
      .subscribe({

        next: user => {

          this.users = [
            ...this.users,
            user
          ];

          this.agentForm.reset();

          this.showCreateAgent =
            false;

          this.submitting =
            false;

          this.successMessage =
            'Agent créé avec succès.';
        },

        error: error => {

          console.error(
            'Erreur création agent',
            error
          );

          this.submitting =
            false;

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de créer cet agent.';
        }

      });
  }


  toggleStatus(
    user: AdminUserResponse
  ): void {

    this.errorMessage = '';

    this.successMessage = '';


    const request$ =
      user.actif

        ? this.adminUserService
          .deactivate(user.id)

        : this.adminUserService
          .activate(user.id);


    request$
      .subscribe({

        next: updatedUser => {

          this.users =
            this.users.map(item =>

              item.id === updatedUser.id

                ? updatedUser

                : item
            );

          this.successMessage =
            updatedUser.actif

              ? 'Compte activé.'

              : 'Compte désactivé.';
        },

        error: error => {

          console.error(
            'Erreur changement statut',
            error
          );

          this.errorMessage =
            error?.error?.message
            ||
            'Impossible de modifier le statut.';
        }

      });
  }


  getRoleClass(
    role: string
  ): string {

    return role
      ?.toLowerCase();
  }
}
