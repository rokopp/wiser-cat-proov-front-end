import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private dateUrl = 'api/dates';

  constructor(
    private http: HttpClient
  ) { }

  getDateByFilterId(id: number): Observable<Date[]>{
    return this.http.get<Date[]>(this.dateUrl + '/filters/' + id);
  }

  postDate(dateObj): Observable<Date> {
    return this.http.post<Date>(this.dateUrl, dateObj, {});
  }

  updateDate(dateObj): Observable<Date> {
    return this.http.put<Date>(this.dateUrl, dateObj);
  }

  deleteDate(id: number): Observable<Date>{
    return this.http.delete<Date>(this.dateUrl + '/' + id);
  }
}
