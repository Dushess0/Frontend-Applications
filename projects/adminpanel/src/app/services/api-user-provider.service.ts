import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserProvider, UserProviderService } from './user-provider.service';
import { catchError, first, retry } from 'rxjs/operators';
import { AuthService } from 'login-lib';

@Injectable({
  providedIn: 'root'
})
export class ApiUserProviderService implements UserProvider {


  serverUrl: string = "http://localhost:8000";
  constructor(private httpService: HttpClient,) {

  }
  get canUse(): boolean
  {
    return true;
  }

  editUser(id: number, user: UserModel): void {
    throw new Error('Method not implemented.');
  }

  getUsers(): Observable<UserModel[]> {
    // this.httpService.get(`${this.serverUrl}/user`).subscribe(data=>console.log( JSON.stringify(data)));
    return this.httpService.get<UserModel[]>(`${this.serverUrl}/user`);
  }
  addUser(user: UserModel): void {
    this.httpService.post<UserModel>(`${this.serverUrl}/user`, user);
  }
  deleteUser(id: number): void {
    throw new Error('Method not implemented.');
  }



}
