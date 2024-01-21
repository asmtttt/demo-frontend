import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm: any;
  showError: boolean = false;

  constructor() {
    
  }
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ])
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.status == "INVALID" || this.resetPasswordForm.errors != null) {
      this.showError = true;
      return;
    }
    this.showError = false;
    //TODO
  }
}
