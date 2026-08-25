// src/app/core/services/admin.service.ts

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
  AdminDashboardResponse
} from '../models/admin-dashboard';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/admin";


  getDashboard():
    Observable<AdminDashboardResponse> {

    return this.http.get<AdminDashboardResponse>(
      `${this.apiUrl}/dashboard`
    );
  }
}
