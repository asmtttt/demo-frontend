import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [{ path: '', component: MapComponent }];

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class MapModule { }
