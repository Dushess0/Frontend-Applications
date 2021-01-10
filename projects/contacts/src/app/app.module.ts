import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent, LoginLibModule, MaterialModule } from 'login-lib';
import { MatTableModule } from '@angular/material/table';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginLibModule,
    HttpClientModule,
    MaterialModule,
    MatTableModule,


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
