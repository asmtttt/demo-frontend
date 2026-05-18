import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BuildingListComponent } from './components/building-list/building-list.component';
import { BuildingFormComponent } from './components/building-form/building-form.component';

const routes: Routes = [{ path: '', component: BuildingListComponent }];

@NgModule({
  declarations: [BuildingListComponent, BuildingFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule]
})
export class BuildingsModule { }
