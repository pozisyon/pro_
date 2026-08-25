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
  CreatePropertyVisitRequest,
  PropertyVisitResponse
} from '../models/property-visit';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl;


  create(
    propertyId: number,
    request: CreatePropertyVisitRequest
  ): Observable<PropertyVisitResponse> {

    return this.http.post<PropertyVisitResponse>(
      `${this.apiUrl}/properties/${propertyId}/visits`,
      request
    );
  }


  findMyVisits():
    Observable<PropertyVisitResponse[]> {

    return this.http.get<PropertyVisitResponse[]>(
      `${this.apiUrl}/visits/me`
    );
  }
}
