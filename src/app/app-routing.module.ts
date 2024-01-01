import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdiverLayoutComponent } from './shared/layout/prodiver-layout/prodiver-layout.component';


const routes: Routes = [
  {
    path: '',
    component: ProdiverLayoutComponent,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
