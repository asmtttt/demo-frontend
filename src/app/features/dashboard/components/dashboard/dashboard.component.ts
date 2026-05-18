import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';
import { Building } from 'src/app/core/models/building.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  buildings: Building[] = [];
  loading = true;

  constructor(public authService: AuthService, private buildingService: BuildingService) {}

  async ngOnInit() {
    this.buildings = this.authService.isAdmin
      ? await this.buildingService.getAllBuildings()
      : await this.buildingService.getMyBuildings();
    this.loading = false;
  }

  get standingCount() { return this.buildings.filter(b => b.status === 'standing').length; }
  get damagedCount() { return this.buildings.filter(b => b.status === 'damaged').length; }
  get destroyedCount() { return this.buildings.filter(b => b.status === 'destroyed').length; }
  get totalOccupancy() { return this.buildings.reduce((s, b) => s + b.current_occupancy, 0); }
}
