import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserProvider, UserProviderService } from './user-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserProviderService implements UserProvider {

  constructor (private httpService:HttpClient)
  {

  }
  get canUse(): boolean {
    return false;
  }
  editUser(id: number, user: UserModel): void {
    throw new Error('Method not implemented.');
  }

  getUsers(): UserModel[] {
    throw new Error('Method not implemented.');
  }
  addUser(user: UserModel): void {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: number): void {
    throw new Error('Method not implemented.');
  }


  
}
