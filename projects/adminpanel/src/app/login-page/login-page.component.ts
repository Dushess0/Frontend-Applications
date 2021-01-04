import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from 'projects/login-lib/src/public-api';
import { ApiUserProviderService } from '../services/api-user-provider.service';
import { LocalUserProviderService } from '../services/local-user-provider.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public apiProvider:ApiUserProviderService, 
    public localProvider:LocalUserProviderService,
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
