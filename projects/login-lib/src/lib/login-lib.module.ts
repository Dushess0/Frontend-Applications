import { NgModule } from '@angular/core';
import { CallbackUrlPageComponent } from './callback-url/callback-url-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageService } from './local-storage.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';



@NgModule({
  declarations: [
    HeaderComponent,
    ForbiddenPageComponent,
    CallbackUrlPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule
  ],
  providers:
    [AuthService,
      AuthGuardService,
      LocalStorageService,
    ],
  exports: [HeaderComponent,ForbiddenPageComponent,CallbackUrlPageComponent]
})
export class LoginLibModule { }
