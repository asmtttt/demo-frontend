import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdiverLayoutComponent } from './layout/prodiver-layout/prodiver-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

@NgModule({
  declarations: [
    ProdiverLayoutComponent,
    NavbarComponent,
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProdiverLayoutComponent,
    PublicLayoutComponent
  ]
})
export class SharedModule { }
