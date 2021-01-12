import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'login-lib';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserProvider } from './user-provider.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUserProviderService implements UserProvider {
  serverUrl: string = 'http://localhost:8000';
  constructor(
    private httpService: HttpClient,
    private authService: AuthService
  ) {}
  get canUse(): boolean {
    return this.authService.connectionExists;
  }

  editUser(id: number, user: UserModel): void {
    throw new Error('Method not implemented.');
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpService.get<UserModel[]>(`${this.serverUrl}/users`);
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
