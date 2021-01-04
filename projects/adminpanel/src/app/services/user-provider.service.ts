import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiUserProviderService } from './api-user-provider.service';
import { LocalStorageService } from './local-storage.service';
import { LocalUserProviderService } from './local-user-provider.service';


@Injectable({
  providedIn: 'root'
})
export class UserProviderService {


  constructor(private apiUsers: ApiUserProviderService, private localUsers: LocalUserProviderService, private storage: LocalStorageService) {

  }

  public get currentProvider(): UserProvider {
    if (this.storage.offineMode && this.localUsers.canUse)
      return this.localUsers
    else if (this.apiUsers.canUse) {
      return this.apiUsers;
    }
    return this.localUsers;


  }
}

export interface UserProvider {

  getUsers(): Observable<UserModel[]>;
  addUser(user: UserModel): void;
  deleteUser(id: number): void;
  editUser(id: number, user: UserModel): void;

  readonly canUse: boolean;

}
