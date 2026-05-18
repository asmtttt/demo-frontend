import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdiverLayoutComponent } from './shared/layout/prodiver-layout/prodiver-layout.component';
import { PublicLayoutComponent } from './shared/layout/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: PublicLayoutComponent,
    canActivate: [loginGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: ProdiverLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'buildings',
        loadChildren: () => import('./features/buildings/buildings.module').then(m => m.BuildingsModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./features/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
