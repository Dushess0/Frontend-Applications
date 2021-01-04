import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';
import { LocalStorageService } from '../../../../login-lib/src/lib/local-storage.service';
import { UserProvider } from './user-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LocalUserProviderService implements UserProvider {

  constructor(private storage: LocalStorageService) { }
  get canUse(): boolean {
    return this.storage.isLocalStorageSupported;
  }
  getUsers(): Observable<UserModel[]> {
    const users = this.storage.get("users") as UserModel[];
    if (users && users.length!=0 && users.length!=undefined)
      return of(users);
    const mockupUsers: UserModel[] = [
      {
        username: "Marcin",
        id: 0,
        phone_number: "+485257366"
      }
    ]
    mockupUsers.forEach(element => {
      this.addUser(element);
    });
    return of(mockupUsers);
  }
  addUser(user: UserModel): void {
    var users = this.storage.get("users") as UserModel[];

    if (!users || users.length==0 || users.length==undefined) 
      users = [];

    users?.push(user);
    this.storage.set("users", users);
  }
  deleteUser(id: number): void {
    const users = this.storage.get("users") as UserModel[];
    users.splice(id, 1);
    this.storage.set("users", users);
  }
  editUser(id: number, user: UserModel): void {
    const users = this.storage.get("users") as UserModel[];
    if (!users) return;
    users[id] = user;
  }
}
