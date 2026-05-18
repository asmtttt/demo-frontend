import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  saving = false;
  successMessage = '';

  constructor(public authService: AuthService) {}

  async saveProfile(fullName: string, phone: string) {
    this.saving = true;
    this.successMessage = '';
    await this.authService.updateProfile({ full_name: fullName, phone });
    this.saving = false;
    this.successMessage = 'Profil güncellendi.';
  }
}
