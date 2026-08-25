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
  AppointmentResponse
} from '../models/appointment';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AgentAppointmentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/agent";


  findMyAppointments():
    Observable<AppointmentResponse[]> {

    return this.http.get<AppointmentResponse[]>(
      `${this.apiUrl}/appointments`
    );
  }
  updateStatus(
    appointmentId: number,
    statut: string
  ): Observable<AppointmentResponse> {

    return this.http.patch<AppointmentResponse>(
      `${this.apiUrl}/appointments/${appointmentId}/status`,
      {
        statut
      }
    );
  }
}
