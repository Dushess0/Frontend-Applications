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
        name: "Joanna",
        password: "",
        phone_number: "888-888-888",
        surname: "Kowalska",
        work_norm: 1,
        work_type: "TYPE",
      }
    ]
    mockupUsers.forEach(element => {
      this.addUser(element);
    });
    return of(mockupUsers);
  }
  addUser(user: UserModel): Observable<UserModel> {
    var users = this.storage.get("users") as UserModel[];

    if (!users || users.length==0 || users.length==undefined) 
      users = [];

    users?.push(user);
    this.storage.set("users", users);
    return of(user);
  }
  deleteUser(id: number): void {
    const users = this.storage.get("users") as UserModel[];
    users.splice(id, 1);
    this.storage.set("users", users);
  }
  editUser(user: UserModel): void {
    const users = this.storage.get("users") as UserModel[];
    if (!users) return;
    users[user.id||0] = user;
  }
  addUsers(result: Observable<UserModel[]>) {
    this.storage.remove("users");
    result.subscribe(users =>
      users.forEach(user => {
        this.addUser(user);
      }));
  }
}
