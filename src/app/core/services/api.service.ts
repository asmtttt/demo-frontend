import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  post(endpoint: string, body: any) : Observable<any> {
    if (this.tokenService.tokenIsValid()) {
      const httpOptions = {
        headers: new HttpHeaders({
          "Authorization": "Bearer " + this.tokenService.getToken(),
          "Content-Type": "application/json"
        })
    };
      return this.httpClient.post(environment.serviceBaseUrl + endpoint, body);
    };
    return new Observable<any>();
  }

  postWithoutToken(endpoint: string, body: any) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.httpClient.post(environment.serviceBaseUrl + endpoint, body, httpOptions);
  }
}
