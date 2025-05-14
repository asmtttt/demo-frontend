import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './components/language/language.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LanguageComponent },
];

@NgModule({
  declarations: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LanguageComponent
  ],
})
export class DashboardModule { }
