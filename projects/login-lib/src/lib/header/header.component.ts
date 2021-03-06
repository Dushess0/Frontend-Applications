import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public storage: LocalStorageService,
    private router: Router
  ) { }

  loggedIn: boolean = false;
  userName?: string;

  disableOfflineMode() {
    this.storage.OffLineMode = false;
    this.router.navigateByUrl(this.router.createUrlTree(['/login'], {}));
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      console.log(user);
      this.userName = user.name;

    });
    this.authService.authenticatedState$.subscribe(data => {
      if (data)
        this.loggedIn = data.isAuthenticated;
      else
        this.loggedIn = false;
    })
  }
  logout() {
    this.authService.logout();
  }
}
