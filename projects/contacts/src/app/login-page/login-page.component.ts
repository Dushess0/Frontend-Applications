import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LocalStorageService } from 'login-lib';
import { ApiContactsProviderService } from '../services/api-contacts-provider.service';
import { LocalContactsProviderService } from '../services/local-contacts-provider.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public apiProvider: ApiContactsProviderService,
    public localProvider: LocalContactsProviderService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginSSO() {
    this.authService.authenticate();
  }
  offlineLog() {
    this.localStorage.OffLineMode = true;
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/'], {}
      )
    );
  }
  register() {

  }

}
