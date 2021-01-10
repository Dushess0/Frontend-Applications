import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userFiels, UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel) { }

  ngOnInit(): void {
    if (this.data == null) {
      this.data = {} as UserModel;
    }
  }
  fields: string[] = userFiels;

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {

    this.dialogRef.close(this.data as UserModel);
  }

}
