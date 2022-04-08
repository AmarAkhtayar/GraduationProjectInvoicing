import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector,
        private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);

        if (!authService.isAuthenticated()) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.getJWTToken())
        });

        return next.handle(authReq)
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    const status = error.status;

                    console.log(status, 'interceptor error --->', error);

                }

                return throwError(error);
            }));
    }
}
