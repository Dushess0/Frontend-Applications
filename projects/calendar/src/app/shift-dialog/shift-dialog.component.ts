import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayModel } from '../calendar/calendar.component';


@Component({
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.scss']
})
export class ShiftDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DayModel) {

  }

  ngOnInit(): void {
    
  }

}
