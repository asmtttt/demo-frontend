import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from 'src/app/core/models/building.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.css']
})
export class BuildingListComponent implements OnInit {
  buildings: Building[] = [];
  loading = true;
  showForm = false;

  pageSize = 15;
  currentPage = 0;

  constructor(
    public authService: AuthService,
    private buildingService: BuildingService,
    private confirmService: ConfirmService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['add'] === '1') {
        this.showForm = true;
      }
    });
    await this.loadBuildings();
  }

  async loadBuildings() {
    this.loading = true;
    this.buildings = this.authService.isAdmin
      ? await this.buildingService.getAllBuildings()
      : await this.buildingService.getMyBuildings();
    this.loading = false;
    this.currentPage = 0;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.buildings.length / this.pageSize));
  }

  get pagedBuildings(): Building[] {
    const start = this.currentPage * this.pageSize;
    return this.buildings.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  goToPage(p: number) { this.currentPage = p; }
  prevPage() { if (this.currentPage > 0) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages - 1) this.currentPage++; }

  async deleteBuilding(id: string, name: string) {
    const confirmed = await this.confirmService.confirm({
      title: 'Binayı Sil',
      message: `"${name}" adlı binayı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      danger: true
    });
    if (!confirmed) return;
    await this.buildingService.deleteBuilding(id);
    this.buildings = this.buildings.filter(b => b.id !== id);
    if (this.currentPage >= this.totalPages) this.currentPage = this.totalPages - 1;
  }

  onFormSaved() {
    this.showForm = false;
    this.loadBuildings();
  }

  onFormCancelled() {
    this.showForm = false;
  }

  min(a: number, b: number) { return Math.min(a, b); }

  statusLabel(status: string) {
    return status === 'standing' ? 'Ayakta' : status === 'damaged' ? 'Hasarlı' : 'Yıkık';
  }

  statusClass(status: string) {
    return status === 'standing' ? 'badge-green' : status === 'damaged' ? 'badge-orange' : 'badge-red';
  }
}
