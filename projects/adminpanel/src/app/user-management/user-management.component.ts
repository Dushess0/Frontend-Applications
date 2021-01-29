import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { userFiels, UserModel } from '../models/user.model';
import { UserProviderService } from '../services/user-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'login-lib';

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

	displayedColumns: string[];
	constructor(
		private userProvider: UserProviderService,
		public dialog: MatDialog,
		private http:HttpClient,
		private authService:AuthService
	) {
		this.displayedColumns = userFiels.filter(val => val != "password");
	}

	users: UserModel[] = [];
	expandedElement: UserModel | null = null;

	private getUsers(): void {
		this.userProvider.currentProvider.getUsers().subscribe(data => this.users = data);
	}
	ngOnInit(): void {
		this.getUsers();
	}

	cancelChanges(user: UserModel) {
		this.getUsers();
	}
	saveChanges(user: UserModel) {
		this.userProvider.currentProvider.editUser(user);
		this.getUsers()
	}
	revokeUser(user: UserModel) {
		this.http.post(`${this.authService.identityServerUrl}/revoke_user_token`,user.id);
	}
	deleteUser(user: UserModel) {
		this.userProvider.currentProvider.deleteUser(user.id || 0);
		this.getUsers();
	}
	addUser() {

		const dialogRef = this.dialog.open(UserCreateComponent, {
			width: '250px',

		});
		dialogRef.afterClosed().subscribe(result => {
			this.userProvider.currentProvider.addUser(result).subscribe(data =>
				this.getUsers());
		});

	}

}
