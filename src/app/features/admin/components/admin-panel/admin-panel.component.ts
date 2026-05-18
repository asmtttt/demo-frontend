import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';
import { EarthquakeService } from 'src/app/core/services/earthquake.service';
import { Building } from 'src/app/core/models/building.model';
import { EarthquakeSimulation } from 'src/app/core/models/earthquake-simulation.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  buildings: Building[] = [];
  simulations: EarthquakeSimulation[] = [];
  simulationResult: any = null;
  loading = false;
  resetLoading = false;

  simForm = new FormGroup({
    center_lat: new FormControl<number | null>(null, [Validators.required]),
    center_lng: new FormControl<number | null>(null, [Validators.required]),
    magnitude: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.max(10)]),
    radius_km: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
  });

  constructor(
    private buildingService: BuildingService,
    private earthquakeService: EarthquakeService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    this.buildings = await this.buildingService.getAllBuildings();
    this.simulations = await this.earthquakeService.getSimulations();
  }

  async runSimulation() {
    if (this.simForm.invalid) return;
    this.loading = true;
    this.simulationResult = null;

    const dto = {
      center_lat: this.simForm.value.center_lat!,
      center_lng: this.simForm.value.center_lng!,
      magnitude: this.simForm.value.magnitude!,
      radius_km: this.simForm.value.radius_km!
    };

    const result = await this.earthquakeService.runSimulation(
      dto,
      this.authService.currentUser!.id,
      this.buildings
    );

    this.simulationResult = result;
    this.simulations = await this.earthquakeService.getSimulations();
    this.buildings = await this.buildingService.getAllBuildings();
    this.loading = false;
  }

  async resetBuildings() {
    if (!confirm('Tüm binaların durumunu "Ayakta" olarak sıfırlamak istiyor musunuz?')) return;
    this.resetLoading = true;
    await this.earthquakeService.resetBuildings();
    this.buildings = await this.buildingService.getAllBuildings();
    this.resetLoading = false;
  }

  get standingCount() { return this.buildings.filter(b => b.status === 'standing').length; }
  get damagedCount() { return this.buildings.filter(b => b.status === 'damaged').length; }
  get destroyedCount() { return this.buildings.filter(b => b.status === 'destroyed').length; }

  formatDate(d: string) {
    return new Date(d).toLocaleString('tr-TR');
  }
}
