import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { CallbackUrlPageComponent } from './callback-url/callback-url-page.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';




@NgModule({
  declarations: [
    HeaderComponent,
    ForbiddenPageComponent,
    CallbackUrlPageComponent
  ],
  imports: [
    MaterialModule
  ],
  providers:
    [AuthService,
      AuthGuardService
    ],
  exports: [HeaderComponent,ForbiddenPageComponent,CallbackUrlPageComponent]
})
export class LoginLibModule { }
