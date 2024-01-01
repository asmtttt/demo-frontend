import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdiverLayoutComponent } from './shared/layout/prodiver-layout/prodiver-layout.component';
import { PublicLayoutComponent } from './shared/layout/public-layout/public-layout.component';


const routes: Routes = [
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
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
