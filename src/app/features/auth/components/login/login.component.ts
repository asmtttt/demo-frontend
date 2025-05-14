import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequestModel } from '../../models/login-request-model';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'src/app/core/services/message.service';
import { ResponseMessageModel } from 'src/app/core/models/message-type-model';
import { MessageType } from 'src/app/core/enums/MessageType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: any;
  showError: boolean = false;
  errorMessage: any = '';
  showModal: boolean = false;
  responseMessage: ResponseMessageModel = {messageType: MessageType.Information, message: ""};

  MessageType = MessageType;  

  constructor(private authService: AuthService, private translateService: TranslateService, 
    private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/)
      ])
    });
  }

  onSubmit(): void {
    this.setResponseMessageModel(MessageType.Information, "");
    this.authService.clearUserInfo();

    if (this.loginForm.invalid) {
      this.setResponseMessageModel(MessageType.Error, this.translateService.instant("VALIDATION_ERROR_ALL_FIELDS"))
      this.errorMessage = this.translateService.instant("VALIDATION_ERROR_ALL_FIELDS");  
      return;
    }

    const requestModel: LoginRequestModel = this.loginForm.value;
    
    this.authService.login(requestModel).subscribe({
      next: (response) => {
        
        if (response.result_code === 200 && response.result.length > 0) {
          var result = response.result[0];

          this.authService.setUserInfo(result.access_token, result.user_id, result.username);
          this.setResponseMessageModel(MessageType.Success, this.translateService.instant(response.result_message))
          this.router.navigate(['']); 
        } 
        
        else if (response.result_code === 200 && response.result.length === 0) {
          this.setResponseMessageModel(MessageType.Error, this.translateService.instant(response.result_message))
        } 

        else {
          this.setResponseMessageModel(MessageType.Error, this.translateService.instant("OPERATION_FAILED"))
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed: ' + error.message;
      }
    });
  }


  openModal(){
    this.showModal = true;
  }

  toggleModal() {
    this.showModal = !this.showModal;  // Aç/Kapat
  }

  clearError() {
    this.errorMessage = '';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.showModal) {
      this.toggleModal();
    }
  }

  setResponseMessageModel(messageType: MessageType, message: string){
    this.responseMessage.messageType = messageType;
    this.responseMessage.message = message;
  }
}
