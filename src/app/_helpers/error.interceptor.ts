import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../_services/api.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private api: ApiService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 400) {
          console.log('err', err);
          // auto logout if 401 response returned from api
          // localStorage.removeItem("token");
          // this.userService.logout();
          // this.router.navigate(['/login']);
          // this.router.navigate(['']);

          // location.reload(true);
        }
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          // localStorage.removeItem("token");
          // this.router.navigate(['/login']);

          // location.reload(true);
        }
        if (err.status === 403) {

          // this.userService.logout();
          // this.router.navigate(['']);
          // location.reload(true);
        }
        if (err.status === 404) {
          // console.log('404');
          // auto logout if 401 response returned from api

          // this.userService.logout();
          // this.router.navigate(['/login']);
          // location.reload(true);
        }

        if (err.status === 400) {
          this.router.navigate(['/main']);

          // auto logout if 401 response returned from api
          // this.userService.logout();
          // location.reload(true);
        }

        const error = err.error.message || err.statusText;
        console.log('errorsinterseptor', error);
        return throwError(error);
      })
    );
  }
}
