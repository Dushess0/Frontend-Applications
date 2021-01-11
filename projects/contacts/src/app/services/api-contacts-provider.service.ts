import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'login-lib';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';
import { ContactsProvider } from './contacts-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ApiContactsProviderService implements ContactsProvider {

  contactApiUrl: string = "http://localhost:8000";
  constructor(private httpService: HttpClient, private authService: AuthService) {

  }
  get canUse(): boolean {
    return this.authService.connectionExists;
  }

  getContacts(): Observable<ContactModel[]> {

    return this.httpService.get<ContactModel[]>(`${this.contactApiUrl}/contacts`, {
      headers: new HttpHeaders({
        Authorization: `Berear ${this.authService.token.access_token}`,
      }),
      withCredentials: true,
    });
  }

}
