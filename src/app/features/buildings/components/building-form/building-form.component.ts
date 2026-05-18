import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css']
})
export class BuildingFormComponent {
  @Output() saved = new EventEmitter<void>();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    district: new FormControl(''),
    lat: new FormControl<number | null>(null, [Validators.required]),
    lng: new FormControl<number | null>(null, [Validators.required]),
    construction_year: new FormControl<number | null>(null),
    floor_count: new FormControl<number | null>(null),
    building_type: new FormControl('')
  });

  loading = false;
  errorMessage = '';

  buildingTypes = ['betonarme', 'yigma', 'celik', 'ahsap', 'diger'];

  constructor(private buildingService: BuildingService, private authService: AuthService) {}

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const userId = this.authService.currentUser?.id;
    if (!userId) { this.loading = false; return; }

    const { error } = await this.buildingService.createBuilding({
      ...this.form.value as any,
      user_id: userId
    });

    this.loading = false;
    if (error) {
      this.errorMessage = 'Bina eklenirken hata oluştu.';
    } else {
      this.saved.emit();
    }
  }
}
