import { Injectable } from '@angular/core';
import { LocalStorageService } from 'login-lib';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { ContactsProvider } from './contacts-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LocalContactsProviderService implements ContactsProvider {

  constructor(private storage: LocalStorageService) { }
  get canUse(): boolean {
    return this.storage.isLocalStorageSupported;
  }
  getContacts(): Observable<ContactModel[]> {
    const users = this.storage.get("contacts") as ContactModel[];
    if (users && users.length != 0 && users.length != undefined)
      return of(users);
    const mockupUsers: ContactModel[] = [
      {
        name: "John",
        surname: "Doe",
        phoneNumber: "+485736273"
      }
    ]
    mockupUsers.forEach(element => {
      this.addUser(element);
    });
    return of(mockupUsers);
  }
  addUser(model: ContactModel): Observable<ContactModel> {
    var contacts = this.storage.get("contacts") as ContactModel[];

    if (!contacts || contacts.length == 0 || contacts.length == undefined)
      contacts = [];

    contacts?.push(model);
    this.storage.set("contacts", contacts);
    return of(model);
  }
}
