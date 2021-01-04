import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserProviderService } from '../services/user-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserManagementComponent implements OnInit {

  constructor(
    private userProvider: UserProviderService,
    public dialog: MatDialog
    ) { }
  displayedColumns: string[] = ['name', 'surname', 'phone', 'edit', 'delete'];
  users: UserModel[] = [];
  expandedElement: UserModel | null = null;

  ngOnInit(): void {
    this.users=this.userProvider.currentProvider.getUsers()
  }

  addUser() {

    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userProvider.currentProvider.addUser(result);
    });

  }

}
