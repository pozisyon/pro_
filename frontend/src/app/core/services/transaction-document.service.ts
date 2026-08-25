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
  TransactionDocumentResponse
} from '../models/transaction-document';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TransactionDocumentService {

  private readonly http =
    inject(HttpClient);


  private readonly apiUrl = environment.apiUrl+"/transaction-documents";


  findMyDocuments():
    Observable<TransactionDocumentResponse[]> {

    return this.http.get<TransactionDocumentResponse[]>(
      `${this.apiUrl}/me`
    );
  }
}
