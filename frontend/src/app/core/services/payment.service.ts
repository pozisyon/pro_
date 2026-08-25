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
  PaymentResponse
} from '../models/payment';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl = environment.apiUrl+"/payments";


  findMyPayments():
    Observable<PaymentResponse[]> {

    return this.http.get<PaymentResponse[]>(
      `${this.apiUrl}/me`
    );
  }
}
