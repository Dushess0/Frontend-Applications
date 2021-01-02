import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsProviderService {

  private readonly contactApiUrl = 'http://127.0.0.1:8000';
  constructor(private auth: AuthService, private http: HttpClient) { }

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(`${this.contactApiUrl}/contacts`, { headers: new HttpHeaders({
      Authorization: `Berear ${this.auth.accessToken}`
    })})
  }


}
