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
  showEmptyFields = false;

  onLogin() {
    console.log('Login Model: ', this.loginModel);
    var emptyFields = this.getEmptyFields();

    if (emptyFields.length != 0 && emptyFields.length > 0 ) {
      this.showEmptyFields = true;
      console.log(emptyFields);
      
      console.log(this.showEmptyFields);
      
    }
    else {
      this.showEmptyFields = false;
      console.log(emptyFields);
      console.log(this.showEmptyFields);
      // bu kısımda login servisine istek atılacaktır.
    }
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

  getEmptyFields() {
    var emptyFields: any = [];

    for (var key in this.loginModel) {
      if (this.loginModel.hasOwnProperty(key)) {
        var value = this.loginModel[key];
        if (value === '' || value === false) {
          emptyFields.push(key);
        }
      }
    }
    return emptyFields;
  }
}
