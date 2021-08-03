import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Filter} from '../interfaces/filter';
import {Amount} from '../interfaces/amount';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterUrl = 'api/filters';
  private amountUrl = 'api/amounts';
  private titleUrl = 'api/titles';
  private dateUrl = 'api/dates';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.filterUrl);
  }
  getFilterById(id: number): Observable<Filter> {
    return this.http.get<Filter>(this.filterUrl + '/' + id);
  }
  getFilterIdByName(name: string): Observable<number> {
    return this.http.get<number>(this.filterUrl + '/name/' + name);
  }
  removeFilter(id: number): Observable<Filter>{
    return this.http.delete<Filter>(this.filterUrl + '/' + id);
  }

  postFilter(filterObj): Observable<Filter> {
    return this.http.post<Filter>(this.filterUrl, filterObj, {});
  }

  getAmountByFilterId(id: number): Observable<Amount[]>{
    return this.http.get<Amount[]>(this.amountUrl + '/filters/' + id);
  }

  postAmount(amountObj): Observable<Amount> {
    return this.http.post<Amount>(this.amountUrl, amountObj, {});
  }

  getTitleByFilterId(id: number): Observable<Title[]>{
    return this.http.get<Title[]>(this.titleUrl + '/filters/' + id);
  }

  postTitle(titleObj): Observable<Title> {
    return this.http.post<Title>(this.titleUrl, titleObj, {});
  }

  getDateByFilterId(id: number): Observable<Date[]>{
    return this.http.get<Date[]>(this.dateUrl + '/filters/' + id);
  }

  postDate(dateObj): Observable<Date> {
    return this.http.post<Date>(this.dateUrl, dateObj, {});
  }

  deleteFilter(id: number): Observable<Filter>{
    return this.http.delete<Filter>(this.filterUrl + '/' + id);
  }

  deleteAmount(id: number): Observable<Amount>{
    return this.http.delete<Amount>(this.amountUrl + '/' + id);
  }

  deleteDate(id: number): Observable<Date>{
    return this.http.delete<Date>(this.dateUrl + '/' + id);
  }

  deleteTitle(id: number): Observable<Title>{
    return this.http.delete<Title>(this.titleUrl + '/' + id);
  }
}
