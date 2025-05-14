import { Component, AfterViewInit, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(private mapService: MapService,
    private router: Router,
    private ngZone: NgZone) { }

  operations = [
    { id: 1, name: 'Create Build' },
    { id: 2, name: 'Update Build' },
    { id: 3, name: 'Delete Build' }
  ];

  simulations = [
    { id: 1, name: 'Simulate Earthquake' },
    { id: 2, name: 'Simulate Weather' },
    { id: 3, name: 'Simulate Economy' }
  ];

  reports = [
    { id: 1, name: 'All Builds' },
    { id: 2, name: 'Quarterly Report' },
    { id: 3, name: 'Monthly Report' }
  ];

  filter = {
    buildingName: '',
    city: '',
    district: ''
  };

  // ngAfterViewInit(): void {
  //   this.mapService.initializeMap('map', [40.7128, -74.0060], 13); // New York City koordinatları ve zoom seviyesi
  //   this.addInitialFeatures();
  // }

  ngOnInit(){
    this.mapService.initializeMap('map', [41.0082, 28.9784], 11); // New York City koordinatları ve zoom seviyesi
    this.mapService.loadBuildings(); // Statik bina verilerini yükle
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            this.mapService.initializeMap('map', [41.0082, 28.9784], 13);
            this.mapService.loadBuildings();
            this.mapService.invalidateMapSize();
          }, 50); // 50ms küçük bir bekleme süresi DOM için
        });
      });
  }

  private addInitialFeatures(): void {
    const marker = this.mapService.addMarker([40.7128, -74.0060]);
    const polygonCoordinates: L.LatLngExpression[] = [
      [40.7138, -74.0060],
      [40.7138, -74.0070],
      [40.7128, -74.0070]
    ];
    const polygon = this.mapService.addPolygon(polygonCoordinates);
    
    // Örnek olarak 10 saniye sonra eklenen özellikleri temizle
    setTimeout(() => {
      this.mapService.removeLayer(marker);
      this.mapService.removeLayer(polygon);
    }, 10000);
  }

  onItemClick(item: any) {
    console.log('Item clicked:', item);
  }

  applyFilter() {
    console.log("Filtre uygulandı:", this.filter);
    // Burada filtreleme işlemini haritadaki binalara uygula
  }
}
