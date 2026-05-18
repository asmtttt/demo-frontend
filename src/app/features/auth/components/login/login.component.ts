import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.value;
    const { error } = await this.authService.signIn(email!, password!);

    this.loading = false;
    if (error) {
      this.errorMessage = 'E-posta veya şifre hatalı.';
    } else {
      this.router.navigate(['/']);
    }
  }
}
