import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, LocalStorageService } from 'login-lib';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { ApiContactsProviderService } from './api-contacts-provider.service';
import { LocalContactsProviderService } from './local-contacts-provider.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsProviderService {
  constructor(private apiContacts: ApiContactsProviderService, private localContacts: LocalContactsProviderService, private storage: LocalStorageService) {

  }

  public get currentProvider(): ContactsProvider {
    if (this.storage.OffLineMode && this.localContacts.canUse)
      return this.localContacts
    else
      return this.apiContacts;
  }

}


export interface ContactsProvider {

  getContacts(): Observable<ContactModel[]>;

  readonly canUse: boolean;

}
