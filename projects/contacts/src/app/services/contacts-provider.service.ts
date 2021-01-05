import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'login-lib';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsProviderService {
  private readonly contactApiUrl = 'http://localhost:8000';
  constructor(private auth: AuthService, private http: HttpClient) {}

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.contactApiUrl}/contacts`, {
      headers: new HttpHeaders({
        Authorization: `Berear ${this.auth.accessToken}`,
      }),
      withCredentials: true,
    });
  }
}
