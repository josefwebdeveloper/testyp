import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../_services/api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // debugger;
    const token = localStorage.getItem('token');
    console.log('interseptor request next', request, next, token);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      this.api.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    return next.handle(request);
  }
}
