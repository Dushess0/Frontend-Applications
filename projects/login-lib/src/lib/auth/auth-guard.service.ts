import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private storage: LocalStorageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      map((user) => {
        if (user.isAuthenticated) {
          return true;
        }
        if (this.storage.OffLineMode) return true;
        

        this.router.navigateByUrl(
          this.router.createUrlTree(
            ['/login'], {}
          )
        );
        return false;
      })
    );
  }
}
