import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Filter} from '../interfaces/filter';
import {Amount} from '../interfaces/amount';
import {TitleService} from './title.service';
import {DateService} from './date.service';
import {AmountService} from './amount.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterUrl = 'api/filters';
  criteriaTypes = ['Amount', 'Title', 'Date'];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private titleService: TitleService,
    private dateService: DateService,
    private amountService: AmountService
  ) { }

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.filterUrl);
  }
  getFilterById(id: number): Observable<Filter> {
    return this.http.get<Filter>(this.filterUrl + '/' + id);
  }
  getFilterIdByName(name: string): Observable<number> {
    return this.http.get<number>(this.filterUrl + '/name/' + name);
  }

  updateFilter(filterObj): Observable<Filter> {
    return this.http.put<Filter>(this.filterUrl, filterObj);
  }

  postFilter(filterObj): Observable<Filter> {
    return this.http.post<Filter>(this.filterUrl, filterObj, {});
  }

  deleteFilter(id: number): Observable<Filter>{
    return this.http.delete<Filter>(this.filterUrl + '/' + id);
  }

  updateCriteria(criteriaList, criteriaType): void {
    if (criteriaList != null) {
      criteriaList.forEach(update => {
        if (update.id != null) {
          const updateCriteria = {
            id: update.id,
            compareCondition: update.compareCondition,
            number: update.number
          };
          if (criteriaType === this.criteriaTypes[0]) {
            this.amountService.updateAmount(updateCriteria).subscribe(() => {
            });
          }
          if (criteriaType === this.criteriaTypes[1]) {
            this.titleService.updateTitle(updateCriteria).subscribe(() => {
            });
          }
          if (criteriaType === this.criteriaTypes[2]) {
            this.dateService.updateDate(updateCriteria).subscribe(() => {
            });
          }
        }
      });
    }
  }
}
