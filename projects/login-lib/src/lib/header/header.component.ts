import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loggedIn: boolean = false;




  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(data => {
      this.loggedIn = data.isAuthenticated;
    }
    );
  }

}
