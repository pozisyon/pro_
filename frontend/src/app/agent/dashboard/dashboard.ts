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
  AgentService
} from '../../core/services/agent.service';

import {
  AgentDashboardResponse
} from '../../core/models/agent-dashboard';


@Component({
  selector: 'app-agent-dashboard',

  imports: [
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private readonly agentService =
    inject(AgentService);

  private readonly authService =
    inject(AuthService);


  readonly currentUser =
    this.authService.currentUser;


  loading = true;

  errorMessage = '';


  stats: AgentDashboardResponse = {

    assignedVisits: 0,

    assignedAppointments: 0,

    assignedTransactions: 0,

    activeTransactions: 0
  };


  ngOnInit(): void {

    this.loadDashboard();
  }


  loadDashboard(): void {

    this.loading = true;

    this.errorMessage = '';


    this.agentService
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
            'Erreur dashboard agent',
            error
          );

          this.errorMessage =
            'Impossible de charger le tableau de bord agent.';

          this.loading =
            false;
        }

      });
  }
}
