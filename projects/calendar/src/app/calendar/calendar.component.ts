import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { last } from 'rxjs/operators';
import { ShiftModel } from '../models/ShiftModel';
import { ShiftProviderService } from '../services/shift-provider.service';
import { ShiftDialogComponent } from '../shift-dialog/shift-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  chunks: DayModel[][];
  constructor(private shiftProvider: ShiftProviderService, public dialog: MatDialog) {
    this.chunks = [];
  }

  ngOnInit(): void {

    const firstDay = new Date();
    firstDay.setDate(1);
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);


    this.shiftProvider.currentProvider.getShifts(firstDay, lastDay).subscribe((data) => {
      this.chunks = this.generateMonth(data);
    })
  }
  generateMonth(data: ShiftModel[]) {

    this.chunks = [];
    let firstDay: Date = data[0].day;
    let lastDay: Date = data[0].day;
    data.forEach(element => {
      if (!firstDay || element.day < firstDay)
        firstDay = element.day;
      if (!lastDay || element.day > lastDay)
        lastDay = element.day;
    });
    firstDay = new Date(firstDay);
    lastDay = new Date(lastDay);
   
    var arr: DayModel[] = [];
    const daysIn = this.daysInMonth(firstDay.getMonth(), firstDay.getFullYear());
    for (let index = 1; index <= daysIn; index++) {

      arr.push(
        {
          date: new Date(firstDay.getFullYear(), firstDay.getMonth(), index),
          shifts: []
        }
      )
    }
    data.forEach(element => {
      const day = new Date(element.day);
      const index = arr.findIndex(date => date.date.getDate() === day.getDate());
      arr[index].shifts.push(element);
    });

    const offset = arr[0].date.getDay() - 1;
    for (let index = 0; index < offset; index++) {
      arr.unshift({ date: new Date(), shifts: [], isEmpty: true })

    }

    return this.chunkArray(arr, 7);

  }
  daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }
  showDetailed(day: DayModel) {
    const dialogRef = this.dialog.open(ShiftDialogComponent, { data: day });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  chunkArray(myArray: DayModel[], chunk_size: number) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

}
export interface DayModel {
  date: Date;
  shifts: ShiftModel[];
  isEmpty?: boolean;

}