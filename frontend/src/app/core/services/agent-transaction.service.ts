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
export class AgentTransactionService {

  private readonly http =
    inject(HttpClient);

  private readonly apiUrl = environment.apiUrl+"/agent";


  findMyTransactions():
    Observable<TransactionResponse[]> {

    return this.http.get<TransactionResponse[]>(
      `${this.apiUrl}/transactions`
    );
  }


  updateStatus(
    transactionId: number,
    statut: string
  ): Observable<TransactionResponse> {

    return this.http.patch<TransactionResponse>(
      `${this.apiUrl}/transactions/${transactionId}/status`,
      {
        statut
      }
    );
  }
}
