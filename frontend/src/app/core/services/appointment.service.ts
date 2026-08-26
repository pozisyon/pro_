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
  AppointmentResponse,
  CreateAppointmentRequest
} from '../models/appointment';
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/appointments";


  create(
    request: CreateAppointmentRequest
  ): Observable<AppointmentResponse> {

    return this.http.post<AppointmentResponse>(
      this.apiUrl,
      request
    );
  }


  findMyAppointments():
    Observable<AppointmentResponse[]> {

    return this.http.get<AppointmentResponse[]>(
      `${this.apiUrl}/me`
    );
  }
  findAll(): Observable<AppointmentResponse[]> {

    return this.http.get<AppointmentResponse[]>(
        this.apiUrl
    );

  }
}
