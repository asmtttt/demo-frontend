import { Component, OnInit } from '@angular/core';
import { Building } from 'src/app/core/models/building.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  buildings: Building[] = [];
  loading = true;
  showForm = false;

  constructor(public authService: AuthService, private buildingService: BuildingService) {}

  async ngOnInit() {
    await this.loadBuildings();
  }

  async loadBuildings() {
    this.loading = true;
    this.buildings = this.authService.isAdmin
      ? await this.buildingService.getAllBuildings()
      : await this.buildingService.getMyBuildings();
    this.loading = false;
  }

  async deleteBuilding(id: string) {
    if (!confirm('Bu binayı silmek istediğinize emin misiniz?')) return;
    await this.buildingService.deleteBuilding(id);
    this.buildings = this.buildings.filter(b => b.id !== id);
  }

  onFormSaved() {
    this.showForm = false;
    this.loadBuildings();
  }

  statusLabel(status: string) {
    return status === 'standing' ? 'Ayakta' : status === 'damaged' ? 'Hasarlı' : 'Yıkık';
  }

  statusClass(status: string) {
    return status === 'standing' ? 'badge-green' : status === 'damaged' ? 'badge-orange' : 'badge-red';
  }
}
