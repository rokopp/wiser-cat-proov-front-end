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

  getTitleByFilterId(id: number): Observable<Title[]>{
    return this.http.get<Title[]>(this.titleUrl + '/filters/' + id);
  }

  getDateByFilterId(id: number): Observable<Date[]>{
    return this.http.get<Date[]>(this.dateUrl + '/filters/' + id);
  }

}
