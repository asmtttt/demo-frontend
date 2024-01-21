import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', component: ResetPasswordComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
