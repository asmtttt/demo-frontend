import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private localStorageService: LocalService) { 

  }

  tokenIsValid (): boolean {
    let token = this.getToken();
    if (token) {
      let decodedToken = this.decodeToken(token);
      let dateNow = Date.now() / 1000;
      if (decodedToken.exp < dateNow) {
        return false;
      }
    }
    else {
      return false;
    }
    return true;
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem("Token");
  }

  setToken(token: string) {
    this.localStorageService.setItem("Token", token);
  }

  isAuthenticated(): boolean {
    return this.tokenIsValid();
  }
}
