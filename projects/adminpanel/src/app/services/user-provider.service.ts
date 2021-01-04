import { Injectable } from '@angular/core';
import { LocalStorageService } from 'projects/login-lib/src/public-api';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiUserProviderService } from './api-user-provider.service';

import { LocalUserProviderService } from './local-user-provider.service';


@Injectable({
  providedIn: 'root'
})
export class UserProviderService {


  constructor(private apiUsers: ApiUserProviderService, private localUsers: LocalUserProviderService, private storage: LocalStorageService) {

  }

  public get currentProvider(): UserProvider {
    if (this.storage.OffLineMode && this.localUsers.canUse)
      return this.localUsers
    else
      return this.apiUsers;
    
    


  }
}

export interface UserProvider {

  getUsers(): Observable<UserModel[]>;
  addUser(user: UserModel): void;
  deleteUser(id: number): void;
  editUser(id: number, user: UserModel): void;

  readonly canUse: boolean;

}
