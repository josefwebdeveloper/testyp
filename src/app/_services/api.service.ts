import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FeedResponse } from '../_models/Feed';
import { Setup } from '../_models/Setup';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private data: DataService) {
  }

  private token;

  static handleError(setup: string) {
    return undefined;
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.http.post(`${environment.apiUrlCall}token`, '').subscribe(
        _token => {
          localStorage.setItem('token', JSON.parse(JSON.stringify(_token)).token);
          this.token = localStorage.getItem('token');
          this.data.sendToken(this.token);
        });
    } else {
      this.data.sendToken(token);
    }
  }

  getSetup(): Observable<Setup> {
    this.token = localStorage.getItem('token');

    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };

    return this.http.get<any>(`${environment.apiUrlCall}setup/he-il`, header).pipe(
      map(res => {
        return res.data[0].attributes;
      }),
      catchError(ApiService.handleError('setup'))
    );
  }

  memberProductRelated(memberId, productId) {
    this.token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<any>(
        `${
          environment.apiUrlCall
          }members/${memberId}/products/${productId}/related?offset=1&limit=20&type=sold`,
        header
      )
      .pipe(
        catchError(this.handleError<any>('memberProductRelated'))
      );
  }

  getFeed(searchTerm = '', categoryId = '', page = 1, limit = 20): Observable<FeedResponse> {
    this.token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http
      .get<FeedResponse>(
        `${
          environment.apiUrlCall
          }feed?offset=${page}&limit=${limit}&latitude=0.0&longitude=0.0&categoryId=${categoryId}&searchTerm=${searchTerm}`,
        header
      )
      .pipe(
        catchError(this.handleError<any>('feed'))
      );
  }

  getProduct(productId) {
    this.token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<any>(`${environment.apiUrlCall}feed/product/${productId}`
      , header
    ).pipe(
      catchError(this.handleError<any>('product'))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

