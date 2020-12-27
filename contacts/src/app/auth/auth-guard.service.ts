import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      map((user) => {
        if (user.isAuthenticated) {
          return true;
        }
        this.auth.authenticate();
        return false;
      })
    );
  }
}
