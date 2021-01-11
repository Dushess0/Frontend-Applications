import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, of, Subscription } from 'rxjs';
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
  private _accessToken: string = '';
  public get accessToken(): string {
    return this._accessToken;
  }

  private get callbackUrl() {
    const base = window.location.href.substring(
      0,
      window.location.href.lastIndexOf('/')
    );
    return `${base}/callback-url`;
  }

  connectionExists: boolean = false;
  private identityServerUrl = 'http://localhost:8000';
  // TODO: Add provider for this values
  private clientId = '123123';
  private requiredScope = ['read adminpanel', 'write adminpanel'];

  private currentInterval = 1000;
  private source = interval(this.currentInterval);

  private pingSubscription: Subscription;

  constructor(private http: HttpClient, public router: Router) {
    this.pingSubscription = this.pingServer();
  }

  private pingServer(): Subscription {
    return this.source.subscribe(() => {
      this.http
        .get(`${this.identityServerUrl}/is_active`, { observe: 'response' })
        .subscribe(
          (resp) => {
            console.log(resp);
            this.connectionExists = resp.status === 200;
            this.pingSubscription.unsubscribe();
          },
          (err) => {
            this.pingSubscription.unsubscribe();
            this.currentInterval += 5000;
            this.source = interval(this.currentInterval);
            this.pingSubscription = this.pingServer();
          }
        );
    });
  }
  public isAuthenticated(): Observable<UserModel> {
    console.log("casll");
    return this.http
      .get<ServerUserModel>(`${this.identityServerUrl}/is_authenticated`, {
        withCredentials: true,
        headers: new HttpHeaders({
          Authorization: `Berear ${this.accessToken}`,
        }),
      })
      .pipe(
        map((response) => ({
          isAuthenticated: response.is_authenticated,
        })),
        catchError((_) => of({ isAuthenticated: false }))
      );
  }

  public authenticate() {
    this.router.navigateByUrl(this.router.createUrlTree(['/callback-url'], {}));
    const url = `${this.identityServerUrl}/login?callback_url=${this.callbackUrl}&scope=${this.requiredScope}&client_id=${this.clientId}`;
    window.location.replace(url);
  }
  public logout() {

    const url = `${this.identityServerUrl}/revoke`;
    return this.http
      .post(url, this.accessToken).subscribe(
        () => {
          location.reload();
        }
      )

  }

  public getAccessToken(code: string): Observable<string> {
    const url = `${this.identityServerUrl}/token?code=${code}`;
    return this.http.get<ServerTokenResponse>(url).pipe(
      map((token) => token.token),
      tap((token) => (this._accessToken = token))
    );
  }
}
