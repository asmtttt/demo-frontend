import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent} from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: ProfileComponent },
];

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  exports: [
    ProfileComponent
  ],
})
export class ProfileModule { }


