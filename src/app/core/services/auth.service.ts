import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { PageService } from './page.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private localService: LocalService, private pageService: PageService, private tokenService: TokenService,
    private router: Router) { }

  login(body: any, rememberMeFlag: boolean) {
     this.pageService.login(body).subscribe(res => {
      if (res.token && res.errorMessage == null) {
        this.isLoggedIn = true;
        if (rememberMeFlag) { // TODO Remember Me
        }
        this.localService.setItem("Email", body.email);
        this.tokenService.setToken(res.token);
        this.router.navigateByUrl("/");
      }
    })
    return this.isLoggedIn;
  }

  logOut() {
    this.localService.clear();
  }
}
