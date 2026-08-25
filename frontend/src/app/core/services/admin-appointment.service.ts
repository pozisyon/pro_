// src/app/core/services/admin-appointment.service.ts

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
  AdminAppointmentResponse
} from '../models/admin-appointment';

import {
  AdminUserResponse
} from '../models/admin-user';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminAppointmentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl;


  findAllAppointments():
    Observable<AdminAppointmentResponse[]> {

    return this.http.get<AdminAppointmentResponse[]>(
      `${this.apiUrl}/appointments`
    );
  }


  findAgents():
    Observable<AdminUserResponse[]> {

    return this.http.get<AdminUserResponse[]>(
      `${this.apiUrl}/admin/users/agents`
    );
  }


  assignAgent(
    appointmentId: number,
    agentId: number
  ): Observable<AdminAppointmentResponse> {

    return this.http.patch<AdminAppointmentResponse>(
      `${this.apiUrl}/admin/appointments/${appointmentId}/assign/${agentId}`,
      {}
    );
  }
}
