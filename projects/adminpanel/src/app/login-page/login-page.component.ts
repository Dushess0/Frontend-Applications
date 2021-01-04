import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/login-lib/src/public-api';
import { ApiUserProviderService } from '../services/api-user-provider.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LocalUserProviderService } from '../services/local-user-provider.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public apiProvider:ApiUserProviderService, public localProvider:LocalUserProviderService,private  authService:AuthService, private localStorage:LocalStorageService) { }

  ngOnInit(): void {
  }

  loginSSO()
  {
    this.authService.authenticate();
  }
  offlineLog()
  {
    this.localStorage.offineMode=true;
  }
  register()
  {

  }

}
