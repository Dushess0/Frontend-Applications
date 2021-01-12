
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "login-lib";
import { Observable } from "rxjs";
import { ShiftModel } from "../models/ShiftModel";
import { LocalShiftProvider } from "./local-shift.provider";
import { ShiftProvider } from "./shift-provider.service";
export function dateToAPI(date: Date): string {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

@Injectable({
    providedIn: 'root'
})

export class ApiShiftProvider implements ShiftProvider {
    serverUrl: string = "http://localhost:8000";

    addShift(user: ShiftModel): Observable<ShiftModel> {
        throw new Error("Method not implemented.");
    }

    constructor(
        private httpService: HttpClient,
        private authService: AuthService,
        private localShifts: LocalShiftProvider
    ) {

    }
    getShifts(from: Date, to: Date): Observable<ShiftModel[]> {
        const start = dateToAPI(from);
        const end = dateToAPI(to);
        const result = this.httpService.get<ShiftModel[]>(`${this.serverUrl}/worker_shifts/${this.authService.user?.id}?from=${start}&to=${end}`,);
        this.localShifts.addShifts(result);
        return result;
    }
    get canUse(): boolean {
        return this.authService.connectionExists;
    }

}