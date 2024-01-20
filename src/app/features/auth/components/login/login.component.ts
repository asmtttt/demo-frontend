import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModel } from '../../models/login-request-model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  

  constructor(private translateService: TranslateService) {}

  loginModel: LoginModel = { username: '', password: '' };
  @ViewChild('myModal')
  myModal!: ElementRef;

  currentLanguage: string = "tr";

  onLogin() {
    console.log('Login Model: ', this.loginModel);
  }


  openModal() {
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
  }
}
