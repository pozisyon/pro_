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
  TransactionResponse
} from '../models/transaction';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly http =
    inject(HttpClient);



  private readonly apiUrl = environment.apiUrl+"/transactions";


  findMyTransactions():
    Observable<TransactionResponse[]> {

    return this.http.get<TransactionResponse[]>(
      `${this.apiUrl}/me`
    );
  }


  findById(
    id: number
  ): Observable<TransactionResponse> {

    return this.http.get<TransactionResponse>(
      `${this.apiUrl}/${id}`
    );
  }
}
