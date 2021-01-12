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
  serverUrl: string = 'http://localhost:8000';
  constructor(
    private httpService: HttpClient,
    private authService: AuthService,
    private localUsers: LocalUserProviderService
  ) { }
  get canUse(): boolean {
    return this.authService.connectionExists;
  }

  editUser(id: number, user: UserModel): void {
    throw new Error('Method not implemented.');
  }

  getUsers(): Observable<UserModel[]> {
    const result=this.httpService.get<UserModel[]>(`${this.serverUrl}/users`);
    this.localUsers.addUsers(result);
    return result;

  }
  addUser(user: UserModel): Observable<UserModel> {
    return this.httpService.post<UserModel>(
      `${this.serverUrl}/create_user`,
      user
    );
  }
  deleteUser(id: number): void {
    throw new Error('Method not implemented.');
  }
  
}
