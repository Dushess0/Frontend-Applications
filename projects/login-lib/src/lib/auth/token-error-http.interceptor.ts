import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from './auth.service';
@Injectable()
export class TokenErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private router: Router,
        private localStorage:LocalStorageService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status == 403 && !this.localStorage.OffLineMode) {

                        this.router.navigateByUrl(
                            this.router.createUrlTree(
                                ['/login'], {}
                            )
                        );
                    }
                    return throwError(error);
                })
            )
    }
}