import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LocalStorageService, LoginLibModule } from 'login-lib';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ShiftDialogComponent } from './shift-dialog/shift-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatCardModule } from '@angular/material/card';
import { calendarClientIdProvider } from '../enviroment';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ShiftDialogComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginLibModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [LocalStorageService,
    {
      provide: 'clientID', useValue: calendarClientIdProvider
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
