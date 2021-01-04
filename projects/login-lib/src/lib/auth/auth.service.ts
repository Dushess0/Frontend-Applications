import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';

interface ServerUserModel {
  is_authenticated: boolean;
}

interface UserModel {
  isAuthenticated: boolean;
}

interface ServerTokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _accessToken: string="";
  public get accessToken(): string {
    return this._accessToken;
  }

  private get callbackUrl() {
    const base= window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    return `${base}/callback-url`;
  }

  
  private clientId = '123123';
  private identityServerUrl = 'http://localhost:8000';
  private requiredScope = ['read adminpanel', 'write adminpanel'];
  constructor(private http: HttpClient, public router: Router) {}


  public canLogin():Observable<boolean>
  {
    return this.http.get(`${this.identityServerUrl}`, { observe: 'response' }).pipe(
      map((user) => {
        if (user) {
          console.log(user);
          return true;
        }
        return false;
      })
    );

    
    
  }

  public isAuthenticated(): Observable<UserModel> {
    return this.http
      .get<ServerUserModel>(`${this.identityServerUrl}/is_authenticated`)
      .pipe(
        map((response) => ({
          isAuthenticated: response.is_authenticated,
        })),
        catchError((_) => of({ isAuthenticated: false }))
      );
  }

  public authenticate() {
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/callback-url'], {}
      )
    );
    const url = `${this.identityServerUrl}/login?callback_url=${this.callbackUrl}&scope=${this.requiredScope}&client_id=${this.clientId}`;
    window.location.replace(url);
  }

  public getAccessToken(code: string): Observable<string> {
    const url = `${this.identityServerUrl}/token?code=${code}`;
    return this.http.get<ServerTokenResponse>(url).pipe(
      map((token) => token.token),
      tap((token) => this._accessToken=token)
    );
  }
}
