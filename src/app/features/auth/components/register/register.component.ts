import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('')
  });

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { fullName, email, password } = this.form.value;
    const { error } = await this.authService.signUp(email!, password!, fullName!);

    this.loading = false;
    if (error) {
      this.errorMessage = error.message || 'Kayıt sırasında hata oluştu.';
    } else {
      this.successMessage = 'Kayıt başarılı! E-postanızı doğrulayın, ardından giriş yapabilirsiniz.';
    }
  }
}