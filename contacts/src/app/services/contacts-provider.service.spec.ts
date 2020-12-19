import { TestBed } from '@angular/core/testing';

import { ContactsProviderService } from './contacts-provider.service';

describe('ContactsProviderService', () => {
  let service: ContactsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
