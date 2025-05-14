import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { PageService } from './page.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { LoginRequestModel } from 'src/app/features/auth/models/login-request-model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { RegisterRequestModel } from 'src/app/features/auth/models/register-request-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localService: LocalService, private pageService: PageService, private tokenService: TokenService,
    private router: Router, private http: HttpClient, private apiService: ApiService) { }

  
  login(body: LoginRequestModel): Observable<any> {
    return this.apiService.postWithoutToken("auth/Login", body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string {
    const token = localStorage.getItem('auth_token');
    return token ? token : '';
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['auth/login']);
  }

  register(body: RegisterRequestModel): Observable<any> {
    return this.apiService.postWithoutToken("auth/Register", body).pipe(
      catchError(this.handleError)
    );;
  }

  setUserInfo(token: string, userId: string, username: string){
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('username', username);
  }

  clearUserInfo(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
  }

  getLocalStorage(): { [key: string]: string } {
    let items: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
            const value = localStorage.getItem(key) ?? "";
            items[key] = value;
        }
    }

    return items;
}

}
