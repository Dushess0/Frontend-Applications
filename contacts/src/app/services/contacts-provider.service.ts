import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsProviderService {

  constructor() { }
  private generateMockup(length: Number): ContactModel[] {
    const names = ["Anna", "Zofia", "Paulina", "Maria", "Katarzyna", "Agnieszka", "Aleksandra", "Basia", "Magdalena"]
    const surnames = ["Nowak", "Nowakowska", "Kowalczyk", "Wójcik", "Wożniak", "Szymańska", "Zielińska", "Lewandowska", "Kamińska"]
    let result: ContactModel[] = [];

    for (let index = 0; index < length; index++) {
      result.push({
        name: names[Math.floor(Math.random() * names.length)],
        surname: surnames[Math.floor(Math.random() * surnames.length)],
        phone: "+48" + Math.floor(10000000 + Math.random() * 90000000)
      })

    }
    return result;



  }

  getContacts(): Observable<ContactModel[]> {

    return of(this.generateMockup(10));
  }


}
