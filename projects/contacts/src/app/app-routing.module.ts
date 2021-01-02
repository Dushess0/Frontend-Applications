import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService, CallbackUrlPageComponent, ForbiddenPageComponent } from 'login-lib';

import { ContactPageComponent } from './contact-page/contact-page.component';


const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',
  },
  {
    path: 'callback-url',
    component: CallbackUrlPageComponent,
  },
  {
    path: '**',
    component: ForbiddenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
