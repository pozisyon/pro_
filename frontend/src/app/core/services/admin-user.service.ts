// src/app/core/services/admin-user.service.ts

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
  AdminUserResponse,
  CreateAgentRequest
} from '../models/admin-user';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl = environment.apiUrl+"/admin/users";


  findAll():
    Observable<AdminUserResponse[]> {

    return this.http.get<AdminUserResponse[]>(
      this.apiUrl
    );
  }


  createAgent(
    request: CreateAgentRequest
  ): Observable<AdminUserResponse> {

    return this.http.post<AdminUserResponse>(
      `${this.apiUrl}/agents`,
      request
    );
  }


  activate(
    id: number
  ): Observable<AdminUserResponse> {

    return this.http.patch<AdminUserResponse>(
      `${this.apiUrl}/${id}/activate`,
      {}
    );
  }


  deactivate(
    id: number
  ): Observable<AdminUserResponse> {

    return this.http.patch<AdminUserResponse>(
      `${this.apiUrl}/${id}/deactivate`,
      {}
    );
  }
}
