import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Building } from 'src/app/core/models/building.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markers = new Map<string, L.Marker>();
  private realtimeChannel: any;

  buildings: Building[] = [];
  selectedBuilding: Building | null = null;
  filterCity = '';
  filterDistrict = '';

  constructor(private buildingService: BuildingService, public authService: AuthService) {}

  async ngOnInit() {
    await this.loadBuildings();
    this.subscribeRealtime();
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 100);
  }

  private initMap() {
    this.map = L.map('map', { center: [39.9334, 32.8597], zoom: 6 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
    this.renderMarkers();
  }

  private async loadBuildings() {
    this.buildings = this.authService.isAdmin
      ? await this.buildingService.getAllBuildings()
      : await this.buildingService.getMyBuildings();
  }

  private renderMarkers() {
    this.markers.forEach(m => m.remove());
    this.markers.clear();

    const filtered = this.buildings.filter(b =>
      (!this.filterCity || b.city?.toLowerCase().includes(this.filterCity.toLowerCase())) &&
      (!this.filterDistrict || b.district?.toLowerCase().includes(this.filterDistrict.toLowerCase()))
    );

    filtered.forEach(b => {
      const color = b.status === 'standing' ? '#27ae60' : b.status === 'damaged' ? '#e67e22' : '#e74c3c';
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([b.lat, b.lng], { icon })
        .addTo(this.map)
        .on('click', () => this.selectedBuilding = b);

      this.markers.set(b.id, marker);
    });
  }

  private subscribeRealtime() {
    this.realtimeChannel = this.buildingService.subscribeToBuildings(updated => {
      const idx = this.buildings.findIndex(b => b.id === updated.id);
      if (idx >= 0) {
        this.buildings[idx] = { ...this.buildings[idx], ...updated };
        if (this.selectedBuilding?.id === updated.id) {
          this.selectedBuilding = this.buildings[idx];
        }
      }
      this.renderMarkers();
    });
  }

  applyFilter() {
    this.renderMarkers();
  }

  closePanel() {
    this.selectedBuilding = null;
  }

  get standingCount()  { return this.buildings.filter(b => b.status === 'standing').length; }
  get damagedCount()   { return this.buildings.filter(b => b.status === 'damaged').length; }
  get destroyedCount() { return this.buildings.filter(b => b.status === 'destroyed').length; }

  statusLabel(s: string) {
    return s === 'standing' ? 'Ayakta' : s === 'damaged' ? 'Hasarlı' : 'Yıkık';
  }

  statusClass(s: string) {
    return s === 'standing' ? 'green' : s === 'damaged' ? 'orange' : 'red';
  }

  ngOnDestroy() {
    this.realtimeChannel?.unsubscribe();
    this.map?.remove();
  }
}
