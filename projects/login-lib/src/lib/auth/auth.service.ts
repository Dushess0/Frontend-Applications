import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';

interface ServerUserModel {
  is_authenticated: boolean;
}

interface UserModel {
  isAuthenticated: boolean;
}

interface ServerTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires: number;
}

interface UserInfo {
  id: string;
  name: string;
  surname: string;
  work_type: string;
  work_norm: string;
  phone_number: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: ServerTokenResponse = {
    access_token: '',
    refresh_token: '',
    expires: 0,
    token_type: '',
  };

  authenticatedState$: Subject<UserModel> = new Subject();
  currentUser$: Subject<UserInfo> = new Subject();

  private get callbackUrl() {
    const base = window.location.href.substring(
      0,
      window.location.href.lastIndexOf('/')
    );
    return `${base}/callback-url`;
  }

  connectionExists: boolean = false;
  identityServerUrl = 'http://localhost:8000';

  clientId = '';
  user?: UserInfo;

  private currentInterval = 1000;
  private source = interval(this.currentInterval);

  private pingSubscription: Subscription;

  constructor(
    private http: HttpClient,
    public router: Router,
    private localStorage: LocalStorageService,
    @Inject('clientID') environment: IclientIdProvider
  ) {
    this.pingSubscription = this.pingServer();
    this.clientId = environment.clientId;
    interval(5000).subscribe(_ => {
      if (this.token.refresh_token) {
        this.getAccessToken(this.token.refresh_token).subscribe();
      }

    })



  }

  private pingServer(): Subscription {
    return this.source.subscribe(() => {
      this.http
        .get(`${this.identityServerUrl}/is_active`, { observe: 'response' })
        .subscribe(
          (resp) => {
            this.connectionExists = resp.status === 200;
            this.pingSubscription.unsubscribe();
          },
          () => {
            this.pingSubscription.unsubscribe();
            this.currentInterval += 5000;
            this.source = interval(this.currentInterval);
            this.pingSubscription = this.pingServer();
          }
        );
    });
  }
  public introspect(): Observable<UserModel> {

    return this.http
      .get<ServerUserModel>(`${this.identityServerUrl}/introspect`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const isAuthenticated = {
            isAuthenticated: response.body?.is_authenticated ?? false,
          };
          this.authenticatedState$.next(isAuthenticated);
          return isAuthenticated;
        }),
        catchError((_) => of({ isAuthenticated: false }))
      );
  }

  public isAuthenticated(): Observable<UserModel> {
    if (this.token.access_token === "") {
      this.token = this.localStorage.get("token");
    }
    this.getUserInfo().subscribe();
    return this.introspect();

  }

  public authenticate() {
    this.router.navigateByUrl(this.router.createUrlTree(['/callback-url'], {}));
    const url = `${this.identityServerUrl}/login?callback_url=${this.callbackUrl}&client_id=${this.clientId}`;
    window.location.replace(url);
  }
  public register() {
    this.router.navigateByUrl(this.router.createUrlTree(['/callback-url'], {}));
    const url = `${this.identityServerUrl}/register?callback_url=${this.callbackUrl}&client_id=${this.clientId}`
    window.location.replace(url);
  }

  public getUserInfo() {
    const url = `${this.identityServerUrl}/user`;
    return this.http.get<UserInfo>(url).pipe(
      tap((user) => {
        this.user = user;

        this.currentUser$.next(user);
      })
    );
  }
  public logoutWithRevoke() {
    this.revokeApp(this.clientId);
  }
  public revokeApp(id: string) {
    const url = `${this.identityServerUrl}/revoke`;
    return this.http
      .post(url, {
        client_id: id,
      })
      .subscribe(() => {
        location.reload();
      });
  }

  public logout() {
    const url = `${this.identityServerUrl}/logout`;
    return this.http
      .post(url, {})
      .subscribe(() => {
        location.reload();
      });
  }

  public getAccessToken(code: string): Observable<ServerTokenResponse> {
    const url = `${this.identityServerUrl}/token?code=${code}`;
    return this.http.get<ServerTokenResponse>(url).pipe(
      tap((token) => {
        this.token = token;
        this.localStorage.set("token", this.token);
      })
    );
  }
}

export interface IclientIdProvider {
  clientId: string;
}
