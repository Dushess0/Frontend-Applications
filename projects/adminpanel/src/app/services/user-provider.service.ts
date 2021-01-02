import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  addUser(result: UserModel) {

    if (!result)
      return;
    console.log(result)
    throw new Error('Method not implemented.');
  }

  constructor() { }


  getUsers(): Observable<UserModel[]> {
    const mockupUsers: UserModel[] = [
      {
        name: "Marcin",
        surname: "Najman",
        phone: "+485257366"
      }
    ]
    return of(mockupUsers);
  }



}
