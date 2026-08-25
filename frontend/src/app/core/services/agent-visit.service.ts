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
  PropertyVisitResponse
} from '../models/property-visit';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AgentVisitService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl = environment.apiUrl+"/agent";


  findMyVisits():
    Observable<PropertyVisitResponse[]> {

    return this.http.get<PropertyVisitResponse[]>(
      `${this.apiUrl}/visits`
    );
  }
  updateStatus(
    visitId: number,
    statut: string
  ): Observable<PropertyVisitResponse> {

    return this.http.patch<PropertyVisitResponse>(
      `${this.apiUrl}/visits/${visitId}/status`,
      {
        statut
      }
    );
  }
}
