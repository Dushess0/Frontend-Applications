import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  access_token: string,
  refresh_token: string,
  token_type: string,
  expires: number

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  token: ServerTokenResponse ={ access_token:"", refresh_token:"", expires:0, token_type:"" };

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

    return this.http
      .get<ServerUserModel>(`${this.identityServerUrl}/introspect`, {
        withCredentials: true,
        observe: 'response',
        headers: new HttpHeaders({
          Authorization: `Berear ${this.token.access_token}`,

        },
        )
        ,
      })
      .pipe(
        tap((response) => {
          console.log(response);
          console.log((response as any).headers);
        }),
        map((response) => ({
          isAuthenticated: response.body?.is_authenticated ?? false,
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
      .post(url, this.token.access_token).subscribe(
        () => {
          location.reload();
        }
      )

  }

  public getAccessToken(code: string): Observable<ServerTokenResponse> {
    const url = `${this.identityServerUrl}/token?code=${code}`;
    return this.http.get<ServerTokenResponse>(url).pipe(

      tap((token) => {
        this.token = token;
        console.log(this.token);
      })
    );
  }
}
