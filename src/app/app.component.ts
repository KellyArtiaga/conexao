import { LoginService } from './demo/services/login.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';

  constructor(
    private router: Router,
    private loginService: LoginService,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit() {
    this.document.documentElement.lang = "pt"
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    const token = this.loginService.getToken();
    if (token === undefined || token === "" || token === null) {

      let urlAtual: String = window.location.href.valueOf();

      if (!urlAtual.includes("auth/change-password")) {
          this.redirectToLogin();
      }

      // // logged in so return true
      // this.redirectToLogin();
    }
  }

  redirectToLogin() {
    this.loginService.logout();
    this.router.navigateByUrl("auth/signin");
  }

}
