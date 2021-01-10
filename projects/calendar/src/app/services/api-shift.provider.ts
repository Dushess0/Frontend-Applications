
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "login-lib";
import { Observable } from "rxjs";
import { ShiftModel } from "../models/ShiftModel";
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

    constructor(private httpService: HttpClient, private authService: AuthService) {

    }
    getShifts(from: Date, to: Date): Observable<ShiftModel[]> {
        const start = dateToAPI(from);
        const end = dateToAPI(to);
        return this.httpService.get<ShiftModel[]>(`${this.serverUrl}/worker_shifts/0?from=${start}&to=${end}`,);
    }
    get canUse(): boolean {
        return this.authService.connectionExists;
    }

}