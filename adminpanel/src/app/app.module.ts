import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { CallbackUrlPageComponent } from './callback-url/callback-url-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserManagementComponent } from './user-management/user-management.component';
import { MaterialModule } from './material/material.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenPageComponent,
    CallbackUrlPageComponent,
    HeaderComponent,
    UserManagementComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MaterialModule,
    FormsModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
