// src/app/core/services/agent.service.ts

import {
  inject,
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  AgentDashboardResponse
} from '../models/agent-dashboard';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/agent";


  getDashboard():
    Observable<AgentDashboardResponse> {

    return this.http.get<AgentDashboardResponse>(
      `${this.apiUrl}/dashboard`
    );
  }
}
