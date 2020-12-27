import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-callback-url-page',
  templateUrl: './callback-url-page.component.html',
})
export class CallbackUrlPageComponent implements OnDestroy {
  private routeSubscription: Subscription;
  private accessTokenSubsription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      const code = params.code;
      if (this.accessTokenSubsription) {
        this.accessTokenSubsription.unsubscribe();
      }
      this.accessTokenSubsription = this.auth
        .getAccessToken(code)
        .subscribe((_) => {
          this.router.navigate(['/']);
        });
    });
  }

  public ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.accessTokenSubsription) {
      this.accessTokenSubsription.unsubscribe();
    }
  }
}
