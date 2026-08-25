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


@Injectable({
  providedIn: 'root'
})
export class AgentTransactionService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/agent';


  findMyTransactions():
    Observable<TransactionResponse[]> {

    return this.http.get<TransactionResponse[]>(
      `${this.apiUrl}/transactions`
    );
  }
}
