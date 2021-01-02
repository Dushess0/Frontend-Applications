import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'login-lib';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
