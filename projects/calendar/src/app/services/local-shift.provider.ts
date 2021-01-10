import { Injectable } from "@angular/core";
import { LocalStorageService } from "login-lib";
import { Observable, of } from "rxjs";
import { ShiftModel } from "../models/ShiftModel";
import { ShiftProvider } from "./shift-provider.service";

@Injectable({
    providedIn: 'root'
})
export class LocalShiftProvider implements ShiftProvider {
    constructor(private storage: LocalStorageService) { }
    getShifts(from: Date, to: Date): Observable<ShiftModel[]> {
        const shifts = this.storage.get("shifts") as ShiftModel[];
        if (shifts && shifts.length != 0 && shifts.length != undefined)
            return of(shifts);
        const mockupShifts: ShiftModel[] = [
            {
                code: "1",
                day: new Date("2021-01-04"),
                fromHour: 7,
                isWorking: true,
                name: "L",
                toHour: 20,
                worker_id: 2,
            }
        ]
        mockupShifts.forEach(element => {
            this.addUser(element);
        });
        return of(mockupShifts);
    }


    addShift(user: ShiftModel): Observable<ShiftModel> {
        throw new Error("Method not implemented.");
    }

    get canUse(): boolean {
        return this.storage.isLocalStorageSupported;
    }

    addUser(shift: ShiftModel): Observable<ShiftModel> {
        var shifts = this.storage.get("shifts") as ShiftModel[];
        if (!shifts || shifts.length == 0 || shifts.length == undefined)
            shifts = [];
        shifts?.push(shift);
        this.storage.set("users", shift);
        return of(shift);
    }

}