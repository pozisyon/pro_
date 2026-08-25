import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  AuthService
} from '../../core/auth/auth.service';

import {
  AdminService
} from '../../core/services/admin.service';

import {
  AdminDashboardResponse
} from '../../core/models/admin-dashboard';


@Component({
  selector: 'app-admin-dashboard',

  imports: [
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private readonly adminService =
    inject(AdminService);

  private readonly authService =
    inject(AuthService);


  readonly currentUser =
    this.authService.currentUser;


  loading = true;

  errorMessage = '';


  stats: AdminDashboardResponse = {

    properties: 0,

    users: 0,

    clients: 0,

    agents: 0,

    visits: 0,

    appointments: 0,

    transactions: 0,

    payments: 0,

    pendingVisits: 0,

    pendingAppointments: 0,

    activeTransactions: 0,

    totalPayments: 0
  };

  ngOnInit(): void {

    this.loadDashboard();
  }

  formatAmount(
    amount: number
  ): string {

    return new Intl.NumberFormat(
      'fr-FR',
      {
        style: 'currency',
        currency: 'USD'
      }
    ).format(amount);
  }
  loadDashboard(): void {

    this.loading = true;

    this.errorMessage = '';


    this.adminService
      .getDashboard()
      .subscribe({

        next: stats => {

          this.stats =
            stats;

          this.loading =
            false;
        },


        error: error => {

          console.error(
            'Erreur dashboard admin',
            error
          );

          this.errorMessage =
            'Impossible de charger le tableau de bord administrateur.';

          this.loading =
            false;
        }

      });
  }
}
