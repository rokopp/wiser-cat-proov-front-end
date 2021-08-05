import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleUrl = 'api/titles';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  postTitle(titleObj): Observable<Title> {
    return this.http.post<Title>(this.titleUrl, titleObj, {});
  }

  getTitlesByFilterId(id: number): Observable<Title[]>{
    return this.http.get<Title[]>(this.titleUrl + '/filters/' + id);
  }

  updateTitle(titleObj): Observable<Title> {
    return this.http.put<Title>(this.titleUrl, titleObj);
  }

  deleteTitle(id: number): Observable<Title>{
    return this.http.delete<Title>(this.titleUrl + '/' + id);
  }
}
