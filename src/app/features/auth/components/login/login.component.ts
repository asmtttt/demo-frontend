import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginModel } from '../../models/login-request-model';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: any;
  showError: boolean = false;

  constructor() { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.status == "INVALID" || this.loginForm.errors != null) {
      this.showError = true;
      return;
    }
    this.showError = false;
    //TODO
  }
}
