import { Injectable } from '@angular/core';
import { LocalStorageService } from 'login-lib';

import { Observable } from 'rxjs';
import { ShiftModel } from '../models/ShiftModel';
import { ApiShiftProvider } from './api-shift.provider';
import { LocalShiftProvider } from './local-shift.provider';

@Injectable({
  providedIn: 'root'
})
export class ShiftProviderService {

  constructor(private apiShifts: ApiShiftProvider, private localShifts: LocalShiftProvider, private storage: LocalStorageService) {

  }

  public get currentProvider(): ShiftProvider {
    if (this.storage.OffLineMode && this.localShifts.canUse)
      return this.localShifts
    else
      return this.apiShifts;
  }
}


export interface ShiftProvider {

  getShifts(from: Date, to: Date): Observable<ShiftModel[]>;
  addShift(user: ShiftModel): Observable<ShiftModel>;


  readonly canUse: boolean;

}
