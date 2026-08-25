import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Property } from '../models/property';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/properties";


  findAll(): Observable<Property[]> {

    return this.http.get<Property[]>(
      this.apiUrl
    );
  }


  findFeatured(): Observable<Property[]> {

    return this.http.get<Property[]>(
      `${this.apiUrl}/featured`
    );
  }


  findById(
    id: number
  ): Observable<Property> {

    return this.http.get<Property>(
      `${this.apiUrl}/${id}`
    );
  }
}
