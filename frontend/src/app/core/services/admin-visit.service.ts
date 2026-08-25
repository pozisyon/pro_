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
  AdminVisitResponse
} from '../models/admin-visit';

import {
  AdminUserResponse
} from '../models/admin-user';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminVisitService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl;


  findAllVisits():
    Observable<AdminVisitResponse[]> {

    return this.http.get<AdminVisitResponse[]>(
      `${this.apiUrl}/visits`
    );
  }


  findAgents():
    Observable<AdminUserResponse[]> {

    return this.http.get<AdminUserResponse[]>(
      `${this.apiUrl}/admin/users/agents`
    );
  }


  assignAgent(
    visitId: number,
    agentId: number
  ): Observable<AdminVisitResponse> {

    return this.http.patch<AdminVisitResponse>(
      `${this.apiUrl}/admin/visits/${visitId}/assign/${agentId}`,
      {}
    );
  }
}
