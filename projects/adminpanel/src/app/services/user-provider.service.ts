import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { ApiUserProviderService } from './api-user-provider.service';
import { LocalStorageService } from './local-storage.service';
import { LocalUserProviderService } from './local-user-provider.service';


@Injectable({
  providedIn: 'root'
})
export class UserProviderService {


  constructor(private apiUsers: ApiUserProviderService, private localUsers: LocalUserProviderService) {

  }

  public get currentProvider(): UserProvider {
    if (this.apiUsers.canUse)
      return this.apiUsers;
    else
      return this.localUsers;
  }
}

export interface UserProvider {

  getUsers(): UserModel[];
  addUser(user: UserModel): void;
  deleteUser(id: number): void;
  editUser(id: number, user: UserModel): void;

  readonly canUse: boolean;

}
