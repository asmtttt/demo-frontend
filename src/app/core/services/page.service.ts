import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private apiService: ApiService) { }

  login(body: any) {
    return this.apiService.postWithoutToken("/Auth/Login", body);
  }

  register(body: any) {
    return this.apiService.postWithoutToken("/User/Register", body);
  }
}
