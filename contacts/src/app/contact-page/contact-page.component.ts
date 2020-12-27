import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { ContactsProviderService } from '../services/contacts-provider.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  constructor(private contactService: ContactsProviderService) {}

  contacts: ContactModel[] = [];
  displayedColumns: string[] = ['name', 'surname', 'phone'];
  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }
}
