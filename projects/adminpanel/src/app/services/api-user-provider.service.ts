import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'login-lib';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { LocalUserProviderService } from './local-user-provider.service';
import { UserProvider } from './user-provider.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUserProviderService implements UserProvider {
  constructor(
    private httpService: HttpClient,
    private authService: AuthService,
    private localUsers: LocalUserProviderService
  ) { }
  get canUse(): boolean {
    return this.authService.connectionExists;
  }

  editUser(user: UserModel): void {
    this.httpService.put<UserModel>(`${this.authService.identityServerUrl}/users`,user);
  }

  getUsers(): Observable<UserModel[]> {
    const result=this.httpService.get<UserModel[]>(`${this.authService.identityServerUrl}/users`);
    this.localUsers.addUsers(result);
    return result;

  }
  addUser(user: UserModel): Observable<UserModel> {
    return this.httpService.post<UserModel>(
      `${this.authService.identityServerUrl}/create_user`,
      user
    );
  }
  deleteUser(id: number): Observable<number> {
    return this.httpService.delete<number>(`${this.authService.identityServerUrl}/users/${id}`);
  }
  
}
