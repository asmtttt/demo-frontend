import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent} from './components/map/map.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MapService } from 'src/app/core/services/map.service';

const routes: Routes = [
  { path: '', component: MapComponent },
];

@NgModule({
  declarations: [
    MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  providers: [MapService],
  exports: [
    MapComponent
  ],
})
export class MapModule { }


