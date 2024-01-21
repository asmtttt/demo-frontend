import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: any;
  showError: boolean = false;

  constructor(private translateService: TranslateService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      usagePurpose: new FormControl("", [
        Validators.required
      ]),
      usageType: new FormControl("", [
        Validators.required
      ]),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/)
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/)
      ]),
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
      ]),
      passwordAgain: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(8),
        this.matchPassword.bind(this)
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
        Validators.minLength(10),
        Validators.pattern(/^\d{3}\d{3}\d{4}$/)
      ]),
      usageRules: new FormControl("", [
        Validators.requiredTrue
      ]),
      contractConfirm: new FormControl("", [
        Validators.requiredTrue
      ])
    });

    this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.signUpForm.get('passwordAgain')?.updateValueAndValidity();
    });
  }

  currentLanguage: string = "tr";
  showEmptyFields = false;

  onSubmit() {
    if (this.signUpForm.status == "INVALID" || this.signUpForm.errors != null) {
      this.showError = true;
      return;
    }
    this.showError = false;
    //TODO
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLanguage = lang;
  }

  matchPassword(control: FormControl): { [key: string]: boolean } | null {
    if (this.signUpForm) {
      const password = this.signUpForm.get('password')?.value;
      const passwordAgain = control.value;

      return password === passwordAgain ? null : { 'passwordMismatch': true };
    }
    return { 'passwordMismatch': false };
  }
}