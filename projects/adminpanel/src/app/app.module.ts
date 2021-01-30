import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { LoginLibModule, MaterialModule } from 'login-lib';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from '../../../login-lib/src/lib/local-storage.service';
import { LoginPageComponent } from './login-page/login-page.component';
import {  MatCardModule } from '@angular/material/card';
import { adminClientIdProvider } from '../enviroment';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    UserCreateComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    LoginLibModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
  ],
  providers: [LocalStorageService,
  {
    provide: 'clientID', useValue:adminClientIdProvider
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
