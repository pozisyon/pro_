// src/app/core/services/admin-transaction.service.ts

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
  AdminTransactionResponse
} from '../models/admin-transaction';

import {
  AdminUserResponse
} from '../models/admin-user';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AdminTransactionService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl;


  findAllTransactions():
    Observable<AdminTransactionResponse[]> {

    return this.http.get<AdminTransactionResponse[]>(
      `${this.apiUrl}/transactions`
    );
  }


  findAgents():
    Observable<AdminUserResponse[]> {

    return this.http.get<AdminUserResponse[]>(
      `${this.apiUrl}/admin/users/agents`
    );
  }


  assignAgent(
    transactionId: number,
    agentId: number
  ): Observable<AdminTransactionResponse> {

    return this.http.patch<AdminTransactionResponse>(
      `${this.apiUrl}/admin/transactions/${transactionId}/assign/${agentId}`,
      {}
    );
  }
}
