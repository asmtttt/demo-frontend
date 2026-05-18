import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../core/services/supabase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  showError = false;
  loading = false;
  sent = false;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ])
    });
  }

  async onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.loading = true;
    const email = this.resetPasswordForm.value.email;
    await this.supabaseService.client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth/login'
    });
    this.loading = false;
    this.sent = true;
  }
}
