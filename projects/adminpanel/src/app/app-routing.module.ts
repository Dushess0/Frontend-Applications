import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { AuthGuardService, CallbackUrlPageComponent, ForbiddenPageComponent } from 'login-lib';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [ 
  {
    path: '',
    component: UserManagementComponent,
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    
  },
  {
    path:'login',
    component:LoginPageComponent,
    pathMatch:'full',
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
