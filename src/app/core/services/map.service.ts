import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private layers: L.Layer[] = [];

  constructor() { }

  initializeMap(mapContainerId: string, coordinates: L.LatLngExpression, zoomLevel: number): void {
    if (this.map) return;

    this.configureDefaultMarkerIcon(); // İKON AYARI BURADA 👑
    
    this.map = L.map(mapContainerId).setView(coordinates, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  addMarker(coordinates: L.LatLngExpression, options?: L.MarkerOptions): L.Marker {
    const marker = L.marker(coordinates, options);
    marker.addTo(this.map);
    this.layers.push(marker);
    return marker;
  }

  addPolygon(coordinates: L.LatLngExpression[], options?: L.PolylineOptions): L.Polygon {
    const polygon = L.polygon(coordinates, options);
    polygon.addTo(this.map);
    this.layers.push(polygon);
    return polygon;
  }

  removeLayer(layer: L.Layer): void {
    this.map.removeLayer(layer);
    this.layers = this.layers.filter(l => l !== layer);
  }

  clearAllLayers(): void {
    this.layers.forEach(layer => this.map.removeLayer(layer));
    this.layers = [];
  }

  loadBuildings(): void {
    // İstanbul'dan statik 3 bina verisi
    const buildings = [
      { name: 'Bina 1', coordinates: [41.0082, 28.9784] as [number, number] }, // Ayasofya civarı
      { name: 'Bina 2', coordinates: [41.0328, 28.9765] as [number, number] }, // Taksim civarı
      { name: 'Bina 3', coordinates: [41.0151, 28.9603] as [number, number] }  // Cibali/Kadir Has civarı
    ];
  
    let group = L.featureGroup();
  
    buildings.forEach(building => {
      this.addMarker(building.coordinates).bindPopup(building.name);
    });
  
    this.map.addLayer(group);
    this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
  }
  
  invalidateMapSize(): void {
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  private configureDefaultMarkerIcon(): void {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  
    L.Icon.Default.mergeOptions({
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    });
  }
}
