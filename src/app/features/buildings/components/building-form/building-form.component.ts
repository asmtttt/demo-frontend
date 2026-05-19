import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css']
})
export class BuildingFormComponent {
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

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

  constructor(
    private buildingService: BuildingService,
    private authService: AuthService,
    private confirmService: ConfirmService
  ) {}

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

  async onCancel() {
    if (this.form.dirty) {
      const confirmed = await this.confirmService.confirm({
        title: 'Formu Kapat',
        message: 'Girdiğiniz bilgiler kaydedilmeyecek. Formu kapatmak istediğinize emin misiniz?',
        confirmText: 'Evet, Kapat',
        cancelText: 'Devam Et',
        danger: false
      });
      if (!confirmed) return;
    }
    this.cancelled.emit();
  }
}
