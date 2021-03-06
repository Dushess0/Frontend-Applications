import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'login-lib';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { ContactsProvider } from './contacts-provider.service';
import { LocalContactsProviderService } from './local-contacts-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ApiContactsProviderService implements ContactsProvider {


  constructor(private httpService: HttpClient, private authService: AuthService,private localContacts:LocalContactsProviderService) {

  }
  get canUse(): boolean {
    return this.authService.connectionExists;
  }

  getContacts(): Observable<ContactModel[]> {


    const result= this.httpService.get<ContactModel[]>(`${this.authService.identityServerUrl}/contacts`, {
      headers: new HttpHeaders({
        Authorization: `Berear ${this.authService.token.access_token}`,
      }),
      withCredentials: true,
    });
    this.localContacts.addContacts(result);
    return result;

  }

}
