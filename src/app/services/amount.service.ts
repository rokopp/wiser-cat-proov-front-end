import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Amount} from '../interfaces/amount';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmountService {
  private amountUrl = 'api/amounts';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getAmountByFilterId(id: number): Observable<Amount[]>{
    return this.http.get<Amount[]>(this.amountUrl + '/filters/' + id);
  }

  postAmount(amountObj): Observable<Amount> {
    return this.http.post<Amount>(this.amountUrl, amountObj, {});
  }

  updateAmount(amountObj): Observable<Amount> {
    return this.http.put<Amount>(this.amountUrl, amountObj);
  }

  deleteAmount(id: number): Observable<Amount>{
    return this.http.delete<Amount>(this.amountUrl + '/' + id);
  }
}
