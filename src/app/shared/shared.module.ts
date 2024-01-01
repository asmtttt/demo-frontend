import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdiverLayoutComponent } from './layout/prodiver-layout/prodiver-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';


@NgModule({
  declarations: [
    ProdiverLayoutComponent,
    NavbarComponent,
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    ProdiverLayoutComponent,
    TranslateModule
  ]
})
export class SharedModule { }
