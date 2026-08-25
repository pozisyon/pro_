// src/app/core/services/admin-payment.service.ts

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
  AdminPaymentResponse
} from '../models/admin-payment';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminPaymentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/admin/payments";


  findAll():
    Observable<AdminPaymentResponse[]> {

    return this.http.get<AdminPaymentResponse[]>(
      this.apiUrl
    );
  }
}
