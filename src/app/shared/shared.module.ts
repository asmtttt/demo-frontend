import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdiverLayoutComponent } from './layout/prodiver-layout/prodiver-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    ProdiverLayoutComponent,
    NavbarComponent,
    PublicLayoutComponent,
    ConfirmDialogComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ProdiverLayoutComponent,
    PublicLayoutComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
