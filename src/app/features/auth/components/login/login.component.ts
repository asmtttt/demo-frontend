import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginModel } from '../../models/login-request-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  

  constructor(private modalService: NgbModal) {}

  loginModel: LoginModel = { username: '', password: '' };
  @ViewChild('myModal')
  myModal!: ElementRef;

  onLogin() {
    console.log('Login Model: ', this.loginModel);
  }


  openModal() {
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.myModal.nativeElement.style.display = 'none';
  }
}
