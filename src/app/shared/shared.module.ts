import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdiverLayoutComponent } from './layout/prodiver-layout/prodiver-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProdiverLayoutComponent,
    NavbarComponent
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
