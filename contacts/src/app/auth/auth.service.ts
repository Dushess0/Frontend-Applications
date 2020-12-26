import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
  private _accessToken: Subject<string> = new Subject<string>();
  public get accessToken(): Observable<string> {
    return this._accessToken;
  }

  private get callbackUrl() {
    return `${window.location.href}/callback-url`;
  }

  private clientId = '123123';
  private identityServerUrl = 'http://localhost:8000';
  private requiredScope = ['read contacts', 'write contacs'];
  constructor(private http: HttpClient) {}

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
    const url = `${this.identityServerUrl}/login?callback_url=${this.callbackUrl}&scope=${this.requiredScope}&client_id=${this.clientId}`;
    window.location.replace(url);
  }

  public getAccessToken(code: string): Observable<string> {
    const url = `${this.identityServerUrl}/token?code=${code}`;
    return this.http.get<ServerTokenResponse>(url).pipe(
      map((token) => token.token),
      tap((token) => this._accessToken.next(token))
    );
  }
}
