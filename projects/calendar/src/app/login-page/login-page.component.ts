import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from 'login-lib';
import { ApiShiftProvider } from '../services/api-shift.provider';
import { LocalShiftProvider } from '../services/local-shift.provider';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public apiProvider:ApiShiftProvider, 
    public localProvider:LocalShiftProvider,
    private  authService:AuthService, 
    private localStorage:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
  }

  loginSSO()
  {
    this.authService.authenticate();
  }
  offlineLog()
  {
    this.localStorage.OffLineMode=true;
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/'], {}
      )
    );
  }
  register()
  {

  }

}
